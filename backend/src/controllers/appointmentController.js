const { Appointment, Dentist, Service, User, sequelize } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const { Op } = require('sequelize');

const createAppointment = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { dentistId, serviceId, appointmentTime, notes } = req.body;
        const patientId = req.user.role === 'patient' ? req.user.id : req.body.patientId;

        if (!patientId) return errorResponse(res, 'Patient ID is required', 400);

        // Get service duration
        const service = await Service.findByPk(serviceId);
        if (!service) return errorResponse(res, 'Service not found', 404);

        const startTime = new Date(appointmentTime);
        const endTime = new Date(startTime.getTime() + service.duration * 60000);

        // Slot validation: check for overlaps for the same dentist
        const overlap = await Appointment.findOne({
            where: {
                dentistId,
                status: { [Op.ne]: 'cancelled' },
                [Op.or]: [
                    {
                        appointmentTime: {
                            [Op.lt]: endTime,
                            [Op.gte]: startTime
                        }
                    }
                ]
            },
            transaction: t
        });

        if (overlap) {
            await t.rollback();
            return errorResponse(res, 'Sorry, this date and time is already booked for this specialist.', 400);
        }

        const appointment = await Appointment.create({
            patientId,
            dentistId,
            serviceId,
            appointmentTime,
            notes,
            status: 'pending'
        }, { transaction: t });

        await t.commit();
        successResponse(res, appointment, 'Appointment booked successfully', 201);
    } catch (error) {
        if (t) await t.rollback();
        errorResponse(res, error.message);
    }
};

const getAppointments = async (req, res) => {
    try {
        const where = {};
        if (req.user.role === 'patient') {
            where.patientId = req.user.id;
        } else if (req.user.role === 'dentist') {
            const dentist = await Dentist.findOne({ where: { userId: req.user.id } });
            if (!dentist) return successResponse(res, []);
            where.dentistId = dentist.id;
        }

        const appointments = await Appointment.findAll({
            where,
            include: [
                { model: User, as: 'patient', attributes: ['name', 'email'] },
                { model: Dentist, as: 'dentist', include: [{ model: User, as: 'user', attributes: ['name'] }] },
                { model: Service, as: 'service' }
            ],
            order: [['appointmentTime', 'ASC']]
        });

        successResponse(res, appointments);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return errorResponse(res, 'Appointment not found', 404);

        // RBAC Check
        if (req.user.role === 'patient') {
            if (appointment.patientId !== req.user.id) {
                return errorResponse(res, 'Unauthorized', 403);
            }
            if (status !== 'cancelled') {
                return errorResponse(res, 'Patients can only cancel appointments', 400);
            }
        } else if (req.user.role === 'dentist') {
            const dentist = await Dentist.findOne({ where: { userId: req.user.id } });
            if (!dentist || appointment.dentistId !== dentist.id) {
                return errorResponse(res, 'Unauthorized', 403);
            }
        }
        // Admin has full access

        await appointment.update({ status });
        successResponse(res, appointment, `Appointment ${status}`);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const rescheduleAppointment = async (req, res) => {
    // Logic similar to create (overlap check) but for existing ID
    const t = await sequelize.transaction();
    try {
        const { appointmentTime } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return errorResponse(res, 'Appointment not found', 404);

        const service = await Service.findByPk(appointment.serviceId);
        const startTime = new Date(appointmentTime);
        const endTime = new Date(startTime.getTime() + service.duration * 60000);

        const overlap = await Appointment.findOne({
            where: {
                id: { [Op.ne]: appointment.id },
                dentistId: appointment.dentistId,
                status: { [Op.ne]: 'cancelled' },
                [Op.or]: [
                    {
                        appointmentTime: {
                            [Op.lt]: endTime,
                            [Op.gte]: startTime
                        }
                    }
                ]
            },
            transaction: t
        });

        if (overlap) {
            await t.rollback();
            return errorResponse(res, 'New time slot is not available', 400);
        }

        await appointment.update({ appointmentTime }, { transaction: t });
        await t.commit();
        successResponse(res, appointment, 'Appointment rescheduled');
    } catch (error) {
        if (t) await t.rollback();
        errorResponse(res, error.message);
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
    rescheduleAppointment
};
