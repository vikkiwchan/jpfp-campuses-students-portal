const db = require('../db');
const { DataTypes } = require('sequelize');
const faker = require('faker');

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      'https://patch.com/img/cdn20/users/23539314/20210219/082606/styles/patch_image/public/patch-editorial-usc-uni-ca-ludwig___19202511239.jpg',
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

Campus.beforeCreate((campus) => {
  if (!campus.description || campus.description === '') {
    campus.description = `Campus description is ${faker.lorem.paragraphs(3)}`;
  }
  if (!campus.imageUrl || campus.imageUrl === '') {
    campus.imageUrl =
      'https://patch.com/img/cdn20/users/23539314/20210219/082606/styles/patch_image/public/patch-editorial-usc-uni-ca-ludwig___19202511239.jpg';
  }
});

module.exports = Campus;
