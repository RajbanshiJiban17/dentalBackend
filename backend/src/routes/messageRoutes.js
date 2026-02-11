const express = require('express');
const router = express.Router();
const { createMessage, getAllMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.post('/', createMessage);
router.get('/', protect, authorize('admin'), getAllMessages);

module.exports = router;
