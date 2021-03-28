const {
  db,
  models: { Campus, Student },
} = require('./server/db/index');
const faker = require('faker');

const getRandomCampusId = () => {
  let randomNum = Math.floor(Math.random() * 104);
  return !randomNum ? 1 : randomNum;
};

const syncAndSeed = async () => {
  try {
    await db.authenticate;
    await db.sync({ force: true });
    const campuses = [
      {
        name: 'University Park Campus',
        address: 'Los Angeles, CA 90007',
      },
      {
        name: 'Health Sciences Campus',
        address: ' Zonal Avenue, Biggy St, Los Angeles, CA 90033',
      },
      {
        name: 'USC Orange County Center',
        address: '2300 Michelson Dr, Irvine, CA 92612',
      },
      {
        name: 'USC Wrigley Marine Science Center',
        address: '1 Big Fisherman Cove, Avalon, CA 90704',
      },
    ];

    const students = [
      {
        firstName: 'Angela',
        lastName: 'Boehm',
        email: 'angela.boehm@usc.edu',
        gpa: 3.8,
        campusId: 1,
      },
      {
        firstName: 'Christian',
        lastName: 'Sporer',
        email: 'christian.sporer@usc.edu',
        gpa: 3.3,
        campusId: 1,
      },
      {
        firstName: 'Jovany',
        lastName: 'Carroll',
        email: 'jovany.carroll@usc.edu',
        gpa: 4.0,
        campusId: 2,
      },
      {
        firstName: 'Art',
        lastName: 'Pouros',
        email: 'art.pouros@usc.edu',
        gpa: 2.8,
        campusId: 3,
      },
      {
        firstName: 'Paula',
        lastName: 'Satterfield',
        email: 'paula.satterfield@usc.edu',
        gpa: 3.6,
        campusId: 3,
      },
      {
        firstName: 'Francesca',
        lastName: 'Waelchi',
        email: 'francesca.waelchi@usc.edu',
        gpa: 3.9,
        campusId: 4,
      },
      {
        firstName: 'Bryon',
        lastName: 'Bernier',
        email: 'bryon.bernier@usc.edu',
        gpa: 2.5,
        campusId: 3,
      },
      {
        firstName: 'Fabian',
        lastName: 'Mosciski',
        email: 'fabian.mosciski@usc.edu',
        gpa: 3.4,
        campusId: 2,
      },
      {
        firstName: 'Willms',
        lastName: 'Bart',
        email: 'willms.bart@usc.edu',
        gpa: 3.8,
        campusId: 3,
      },
      {
        firstName: 'Abner',
        lastName: 'Kertzman',
        email: 'abner.kertzman@usc.edu',
        gpa: 3.2,
        campusId: 4,
      },
    ];

    const randomCampuses = Array(100)
      .fill('')
      .map((elem) => ({
        name: `${faker.commerce.department()} Campus`,
        address: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
      }));

    const randomStudents = Array(100)
      .fill('')
      .map((elem) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gpa: (Math.random() * 4).toFixed(2),
        campusId: getRandomCampusId(),
      }));

    await Promise.all(
      [...campuses, ...randomCampuses].map((campus) =>
        Campus.create({
          name: campus.name,
          address: campus.address,
        })
      )
    );
    await Promise.all(
      [...students, ...randomStudents].map((student) =>
        Student.create({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          gpa: student.gpa,
          campusId: student.campusId,
        })
      )
    );
  } catch (err) {
    console.error(err);
  }
};

syncAndSeed();
