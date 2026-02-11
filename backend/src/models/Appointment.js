const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dentistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.DATE, // Sequelize maps this to DATETIME
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true,
    indexes: [
        { fields: ['appointmentTime'] },
        { fields: ['patientId'] },
        { fields: ['dentistId'] }
    ]
});

module.exports = Appointment;
