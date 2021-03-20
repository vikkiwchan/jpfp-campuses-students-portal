const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// GET /api/campuses
app.get('/api/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.status(201).send(campuses);
  } catch (err) {
    console.error(err);
  }
});

// GET /api/students
app.get('/api/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(201).send(students);
  } catch (err) {
    console.error(err);
  }
});

const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/students_campuses_db',
  { logging: false }
);
const faker = require('faker');
const { campuses, students } = require('./seed');

// Campus Model
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
  if (!campus.description) {
    campus.description = `Campus description is ${faker.lorem.paragraphs(3)}`;
  }
});

// Student Model
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
  image: {
    type: DataTypes.STRING,
    defaultValue:
      'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
    validate: {
      isUrl: true,
    },
  },
  gpa: {
    type: DataTypes.DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

// Associations
Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all(
    campuses.map((campus) =>
      Campus.create({
        name: campus.name,
        address: campus.address,
      })
    )
  );
  await Promise.all(
    students.map((student) =>
      Student.create({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        gpa: student.gpa,
        campusId: student.campusId,
      })
    )
  );
};

const init = async () => {
  try {
    await db.authenticate;
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`app is listening at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
