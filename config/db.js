const Sequelize = require('sequelize');

module.exports = new Sequelize('contactmanager', 'postgres', 'Pakistan0300', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});