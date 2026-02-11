const { User } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const bcrypt = require('bcryptjs');

const getAllPatients = async (req, res) => {
    try {
        const patients = await User.findAll({
            where: { role: 'patient' },
            attributes: { exclude: ['password'] }
        });
        successResponse(res, patients);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await User.findOne({
            where: { id: req.params.id, role: 'patient' },
            attributes: { exclude: ['password'] }
        });
        if (!patient) return errorResponse(res, 'Patient not found', 404);
        successResponse(res, patient);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return errorResponse(res, 'Email already in use', 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'patient'
        });

        const result = patient.toJSON();
        delete result.password;
        successResponse(res, result, 'Patient created', 201);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const updatePatient = async (req, res) => {
    try {
        const { name, email } = req.body;
        const patient = await User.findOne({ where: { id: req.params.id, role: 'patient' } });
        if (!patient) return errorResponse(res, 'Patient not found', 404);

        if (email && email !== patient.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) return errorResponse(res, 'Email already in use', 400);
        }

        await patient.update({ name, email });
        successResponse(res, patient, 'Patient updated');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await User.findOne({ where: { id: req.params.id, role: 'patient' } });
        if (!patient) return errorResponse(res, 'Patient not found', 404);
        await patient.destroy();
        successResponse(res, null, 'Patient deleted');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
