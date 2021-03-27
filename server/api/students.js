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

// GET /api/students/sortByLastName
router.get('/byLastName', async (req, res, next) => {
  try {
    const students = await Student.findAll({ order: [['lastName', 'ASC']] });
    res.status(201).send(students);
  } catch (err) {
    console.error(err);
  }
});

// POST /api/students
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (err) {
    console.error(err);
  }
});

// DELETE /api/students
router.delete('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.destroy();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

// PUT_UPDATE /api/students
router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    await student.update(req.body);
    res.status(201).send(student);
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
