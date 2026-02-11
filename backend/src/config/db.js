const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+05:45', // Asia/Kathmandu
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        }
    }
);

module.exports = sequelize;
