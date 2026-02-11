const sequelize = require('../config/db');
const User = require('./User');
const Dentist = require('./Dentist');
const Service = require('./Service');
const Appointment = require('./Appointment');
const Review = require('./Review');
const Message = require('./Message');

// Relationships
User.hasOne(Dentist, { foreignKey: 'userId', as: 'dentistProfile' });
Dentist.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
User.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });

Review.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
User.hasMany(Review, { foreignKey: 'patientId', as: 'reviews' });

Appointment.belongsTo(Dentist, { foreignKey: 'dentistId', as: 'dentist' });
Dentist.hasMany(Appointment, { foreignKey: 'dentistId', as: 'appointments' });

Appointment.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Service.hasMany(Appointment, { foreignKey: 'serviceId', as: 'appointments' });

module.exports = {
    sequelize,
    User,
    Dentist,
    Service,
    Appointment,
    Review,
    Message
};
