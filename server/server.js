const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/students_campuses_db',
  { logging: false }
);
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
      'https://libraries.usc.edu/sites/default/files/styles/16_9_xlarge/public/2019-08/dml-front.jpg?itok=uML3Op66',
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
    campus.description = `Campus description is ${faker.lorem.paragraphs(2)}`;
  }
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Campus.create({
    name: 'University of Southern California',
    address: 'Los Angeles, CA 90007',
  });
};

const init = async () => {
  try {
    await db.authenticate;
    await syncAndSeed();
  } catch (err) {
    console.log(err);
  }
};

init();
