const { User, Dentist } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const bcrypt = require('bcryptjs');

const getAllDentists = async (req, res) => {
    try {
        const dentists = await Dentist.findAll({
            include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
        });
        successResponse(res, dentists);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const createDentist = async (req, res) => {
    try {
        const { name, email, password, specialization, bio } = req.body;
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return errorResponse(res, 'Email already in use', 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'dentist'
        });

        const dentist = await Dentist.create({
            userId: user.id,
            specialization,
            bio,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        successResponse(res, { ...dentist.toJSON(), user: { name, email } }, 'Dentist created', 201);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const updateDentist = async (req, res) => {
    try {
        const { name, email, specialization, bio, isActive } = req.body;
        const dentist = await Dentist.findByPk(req.params.id, {
            include: [{ model: User, as: 'user' }]
        });

        if (!dentist) return errorResponse(res, 'Dentist not found', 404);

        // Update User details if provided
        if (dentist.user) {
            if (email && email !== dentist.user.email) {
                const emailExists = await User.findOne({ where: { email } });
                if (emailExists) return errorResponse(res, 'Email already in use', 400);
            }
            await dentist.user.update({ name, email });
        }

        const updateData = { specialization, bio, isActive };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        await dentist.update(updateData);

        successResponse(res, { ...dentist.toJSON(), user: { name, email } }, 'Dentist updated successfully');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const deleteDentist = async (req, res) => {
    try {
        const dentist = await Dentist.findByPk(req.params.id);
        if (!dentist) return errorResponse(res, 'Dentist not found', 404);

        // We should probably delete the User associated with it
        const user = await User.findByPk(dentist.userId);
        await dentist.destroy();
        if (user) await user.destroy();

        successResponse(res, null, 'Dentist deleted');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

module.exports = {
    getAllDentists,
    createDentist,
    updateDentist,
    deleteDentist
};
