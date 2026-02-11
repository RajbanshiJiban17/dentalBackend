const bcrypt = require('bcryptjs');
const { sequelize, User, Dentist, Service } = require('../models');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB for seeding

        // Create Admin
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@dental.com',
            password: admin123,
            role: 'admin'
        });



        // Create Services
        await Service.bulkCreate([
            { name: 'General Checkup', description: 'Basic dental examination', price: 50, duration: 30 },
            { name: 'Teeth Whitening', description: 'Professional bleaching session', price: 200, duration: 60 },
            { name: 'Root Canal', description: 'Advanced tooth restoration', price: 500, duration: 90 },
            { name: 'Cleaning', description: 'Scaling and polishing', price: 80, duration: 45 }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
