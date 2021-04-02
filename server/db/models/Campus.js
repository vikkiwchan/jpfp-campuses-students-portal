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

// Campus.sortByStudents = (page) => {
//   return this.findAndCountAll({
//     distinct: true,
//     limit: 10,
//     offset: 10 * page,
//     include: Student,
//   });
// };

module.exports = Campus;

// let { page } = req.query;
// --page;
// const data = await Campus.findAndCountAll({
//   distinct: true,
//   limit: 10,
//   offset: 10 * page,
//   include: [
//     {
//       model: Student,
//       attributes: {
//         include: [
//           [sequelize.fn('COUNT', sequelize.col('id')), 'n_students'],
//         ],
//       },
//       // order: [['n_students', 'DESC']],
//     },
//   ],
// });
