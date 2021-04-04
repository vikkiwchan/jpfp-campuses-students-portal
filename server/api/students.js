const router = require('express').Router();
const {
  models: { Student, Campus },
} = require('../db/index');

// GET /api/students
// router.get('/', async (req, res, next) => {
//   try {
//     const students = await Student.findAll({ include: Campus });
//     res.send(students);
//   } catch (err) {
//     next(err);
//   }
// });
router.get('/', async (req, res, next) => {
  try {
    let { page } = req.query;
    --page;
    const data = await Student.findAndCountAll({
      distinct: true,
      limit: 10,
      offset: 10 * page,
      include: Campus,
    });
    setTimeout(() => res.status(200).send(data), 2000);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/sortByLastName
// router.get('/sort/byLastName', async (req, res, next) => {
//   try {
//     const students = await Student.findAll({ order: [['lastName', 'ASC']] });
//     res.send(students);
//   } catch (err) {
//     next(err);
//   }
// });
router.get('/sortByLastName', async (req, res, next) => {
  try {
    let { page } = req.query;
    --page;
    const data = await Student.findAndCountAll({
      distinct: true,
      limit: 10,
      offset: 10 * page,
      include: Campus,
      order: [['lastName', 'ASC']],
    });
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/sortByGpa
// router.get('/sort/byGpa', async (req, res, next) => {
//   try {
//     const students = await Student.findAll({ order: [['gpa', 'DESC']] });
//     res.send(students);
//   } catch (err) {
//     next(err);
//   }
// });
router.get('/sortByGpa', async (req, res, next) => {
  try {
    let { page } = req.query;
    --page;
    const data = await Student.findAndCountAll({
      distinct: true,
      limit: 10,
      offset: 10 * page,
      include: Campus,
      order: [['gpa', 'DESC']],
    });
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/unregistered
router.get('/unregistered', async (req, res, next) => {
  try {
    let { page } = req.query;
    --page;
    const data = await Student.findAndCountAll({
      distinct: true,
      limit: 10,
      offset: 10 * page,
      where: {
        campusId: null,
      },
    });
    res.status(200).send(data);
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
