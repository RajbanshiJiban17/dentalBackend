const successResponse = (res, data, message = 'Success', status = 200) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, message = 'Internal Server Error', status = 500, errors = null) => {
    res.status(status).json({
        success: false,
        message,
        errors
    });
};

module.exports = {
    successResponse,
    errorResponse
};
