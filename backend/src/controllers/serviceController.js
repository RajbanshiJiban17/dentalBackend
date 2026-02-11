const { Service } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        successResponse(res, services);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        successResponse(res, service, 'Service created', 201);
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return errorResponse(res, 'Service not found', 404);
        await service.update(req.body);
        successResponse(res, service, 'Service updated');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return errorResponse(res, 'Service not found', 404);
        await service.destroy();
        successResponse(res, null, 'Service deleted');
    } catch (error) {
        errorResponse(res, error.message);
    }
};

module.exports = {
    getAllServices,
    createService,
    updateService,
    deleteService
};
