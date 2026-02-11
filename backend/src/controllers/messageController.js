const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
    try {
        const { name, email, phone, hospitalName, subject, message } = req.body;
        const newMessage = await Message.create({
            name,
            email,
            phone,
            hospitalName,
            subject,
            message
        });
        res.status(201).json({ success: true, data: newMessage, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
