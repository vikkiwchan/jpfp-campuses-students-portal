const { expect } = require('chai');
const router = require('supertest')(require('../server/api/students'));
const {
  db,
  models: { Student },
} = require('../server/db/index');
const { logTable } = require('./utils');

describe('Express', () => {
  before(() => {
    logTable();
  });

  beforeEach(async () => {
    try {
      await db.sync({ force: true });
      await Promise.all([
        Student.create({
          firstName: 'Angela',
          lastName: 'Boehm',
          email: 'angela.boehm@usc.edu',
          imageUrl:
            'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
          gpa: 3.8,
        }),
        Student.create({
          firstName: 'Christian',
          lastName: 'Sporer',
          email: 'christian.sporer@usc.edu',
          imageUrl:
            'https://as2.ftcdn.net/jpg/02/76/44/01/500_F_276440189_NipLHqCA6EmdxmnyFtom1mDixC63GGKT.jpg',
          gpa: 3.3,
        }),
      ]);
    } catch (err) {
      console.error(err);
    }
  });

  describe('GET /api/students', () => {
    it('return an array of students', async () => {
      try {
        const response = await router.get('/');
        expect(response.body.length).to.equal(2);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
