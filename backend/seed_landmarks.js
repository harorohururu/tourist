// This script seeds the landmark_type and landmark_info tables with sample data for development/testing.
// Usage: node seed_landmarks.js

require('dotenv').config({ path: '../.env' });
const { sequelize, LandmarkType, LandmarkInfo } = require('./models');

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Seed landmark types if empty
    const types = [
      { type_name: 'Historical' },
      { type_name: 'Natural' },
      { type_name: 'Cultural' },
      { type_name: 'Religious' },
      { type_name: 'Modern' },
    ];
    for (const type of types) {
      await LandmarkType.findOrCreate({ where: { type_name: type.type_name } });
    }

    // Get type ids
    const allTypes = await LandmarkType.findAll();
    if (allTypes.length === 0) throw new Error('No landmark types found after seeding.');

    // Seed landmark info if empty
    const count = await LandmarkInfo.count();
    if (count === 0) {
      await LandmarkInfo.bulkCreate([
        {
          name: 'Old Fort',
          landmark_type: allTypes.find(t => t.type_name === 'Historical').type_id,
          address: '123 Heritage Rd',
          total_rooms: 10,
          attraction_code: 'HIST001',
        },
        {
          name: 'Green Lake',
          landmark_type: allTypes.find(t => t.type_name === 'Natural').type_id,
          address: 'Lakeview Park',
          total_rooms: 0,
          attraction_code: 'NAT002',
        },
        {
          name: 'City Museum',
          landmark_type: allTypes.find(t => t.type_name === 'Cultural').type_id,
          address: '456 Museum Ave',
          total_rooms: 5,
          attraction_code: 'CULT003',
        },
      ]);
      console.log('Seeded landmark_info table.');
    } else {
      console.log('landmark_info table already has data.');
    }
    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
