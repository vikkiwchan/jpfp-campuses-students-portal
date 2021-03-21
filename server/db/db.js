const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/students_campuses_db',
  { logging: false }
);

module.exports = db;
