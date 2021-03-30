const router = require('express').Router();
const {
  models: { Student, Campus },
} = require('../db/index');

// GET /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/sort/byLastName
router.get('/sort/byLastName', async (req, res, next) => {
  try {
    const students = await Student.findAll({ order: [['lastName', 'ASC']] });
    res.send(students);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/sort/byGpa
router.get('/sort/byGpa', async (req, res, next) => {
  try {
    const students = await Student.findAll({ order: [['gpa', 'DESC']] });
    res.send(students);
  } catch (err) {
    next(err);
  }
});

// POST /api/students
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/students
router.delete('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT_UPDATE /api/students
router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.update(req.body);
    res.status(201).send(student);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:studentId
router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: { model: Campus },
    });
    res.send(student);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
