const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwtUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return errorResponse(res, 'User already exists', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'patient'
        });

        const token = generateToken(user);

        successResponse(res, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }, 'User registered successfully', 201);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        const token = generateToken(user);

        successResponse(res, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }, 'Login successful');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const getMe = async (req, res) => {
    successResponse(res, req.user);
};

module.exports = {
    register,
    login,
    getMe
};
