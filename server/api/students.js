const router = require('express').Router();
const {
  models: { Student, Campus },
} = require('../db/index');

// GET /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(201).send(students);
  } catch (err) {
    console.error(err);
  }
});

// GET /api/students/:studentId
router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: { model: Campus },
    });
    res.status(201).send(student);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
