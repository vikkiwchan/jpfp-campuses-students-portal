const db = require('./db');
const Campus = require('./models/Campus');
const Student = require('./models/Student');

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  db,
  models: {
    Campus,
    Student,
  },
};
