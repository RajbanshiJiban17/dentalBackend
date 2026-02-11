const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dentist = sequelize.define('Dentist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    specialization: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = Dentist;
