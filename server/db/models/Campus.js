const db = require('../db');
const { DataTypes } = require('sequelize');
const faker = require('faker');

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      'https://libraries.usc.edu/sites/default/files/styles/16_9_xlarge/public/2019-08/dml-front.jpg?itok=uML3Op66',
    validate: {
      isUrl: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Campus.beforeSave((campus) => {
  if (!campus.description || campus.description === '') {
    campus.description = `Campus description is ${faker.lorem.paragraphs(3)}`;
  }
});

module.exports = Campus;
