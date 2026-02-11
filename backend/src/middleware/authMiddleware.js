const { verifyToken } = require('../utils/jwtUtils');
const { errorResponse } = require('../utils/responseUtils');
const { User } = require('../models');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return errorResponse(res, 'Not authorized, no token', 401);
    }

    try {
        const decoded = verifyToken(token);
        req.user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!req.user) {
            return errorResponse(res, 'User no longer exists', 401);
        }

        next();
    } catch (error) {
        return errorResponse(res, 'Not authorized, token failed', 401);
    }
};

module.exports = { protect };
