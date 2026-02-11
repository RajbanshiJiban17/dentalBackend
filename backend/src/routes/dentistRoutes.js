const express = require('express');
const router = express.Router();
const {
    getAllDentists,
    createDentist,
    updateDentist,
    deleteDentist
} = require('../controllers/dentistController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');
const upload = require('../utils/upload');

// Public/Patient can list dentists
router.get('/', getAllDentists);

// Admin only routes
router.post('/', protect, authorize('admin'), upload.single('image'), createDentist);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateDentist);
router.delete('/:id', protect, authorize('admin'), deleteDentist);

module.exports = router;
