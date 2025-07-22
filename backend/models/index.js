const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'appsight',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || '1234',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
  }
);

const TouristInfo = require('./TouristInfo')(sequelize);
const TouristCount = require('./TouristCount')(sequelize);

module.exports = {
  sequelize,
  TouristInfo,
  TouristCount,
};
