const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
    rescheduleAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.post('/', createAppointment);
router.get('/', getAppointments);
router.patch('/:id/status', updateAppointmentStatus);
router.patch('/:id/reschedule', rescheduleAppointment);

module.exports = router;
