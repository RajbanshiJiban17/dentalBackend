const { errorResponse } = require('../utils/responseUtils');

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, `Role (${req.user ? req.user.role : 'none'}) is not allowed to access this resource`, 403);
        }
        next();
    };
};

module.exports = { authorize };
