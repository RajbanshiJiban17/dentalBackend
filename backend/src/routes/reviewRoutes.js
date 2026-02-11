const express = require('express');
const router = express.Router();
const { createReview, getAllReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.get('/', getAllReviews);
router.post('/', protect, authorize('patient'), createReview);

module.exports = router;
