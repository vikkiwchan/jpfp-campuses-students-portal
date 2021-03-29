const { expect } = require('chai');
const {
  db,
  models: { Campus, Student },
} = require('../server/db/index');

describe('Sequelize', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  describe('Campus Model', () => {
    it('name cannot be an empty string', async () => {
      try {
        await Campus.create({
          name: '',
          address: 'Los Angeles, CA 90007',
        });
      } catch (err) {
        expect(err.message).to.equal(
          'Validation error: Validation notEmpty on name failed'
        );
      }
    });
    it('address cannot be an empty string', async () => {
      try {
        await Campus.create({
          name: 'Green Campus',
          address: '',
        });
      } catch (err) {
        expect(err.message).to.equal(
          'Validation error: Validation notEmpty on address failed'
        );
      }
    });
  });

  describe('Student Model', () => {
    it('email must be a valid email', async () => {
      try {
        await Student.create({
          firstName: 'Sydney',
          lastName: 'Catchpole',
          email: 'syd@',
        });
      } catch (err) {
        expect(err.message).to.equal(
          'Validation error: Validation isEmail on email failed'
        );
      }
    });
  });
});
