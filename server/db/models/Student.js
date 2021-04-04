const db = require('../db');
const { DataTypes } = require('sequelize');

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
  },
  gpa: {
    type: DataTypes.DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
  campusId: {
    type: DataTypes.INTEGER,
  },
});

Student.beforeCreate((student) => {
  if (!student.imageUrl || student.imageUrl === '') {
    student.imageUrl =
      'https://as1.ftcdn.net/jpg/02/16/68/42/500_F_216684242_dYK0kFkHpMWpEFMVDeaXaKxVt7SLHiJk.jpg';
  }
});

module.exports = Student;
