const { Review, User } = require('../models');

exports.createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.create({
            patientId: req.user.id,
            rating,
            comment
        });
        res.status(201).json({ success: true, data: review });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [{ model: User, as: 'patient', attributes: ['name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
