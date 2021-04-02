const router = require('express').Router();
const {
  db,
  models: { Campus, Student },
} = require('../db/index');

// GET /api/campuses
// router.get('/', async (req, res, next) => {
//   try {
//     const campuses = await Campus.findAll({ include: [{ model: Student }] });
//     res.send(campuses);
//   } catch (err) {
//     next(err);
//   }
// });

// TEST
router.get('/', async (req, res, next) => {
  try {
    let { page } = req.query;
    --page;
    const data = await Campus.findAndCountAll({
      distinct: true,
      limit: 10,
      offset: 10 * page,
      include: Student,
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/sortByStudents', async (req, res, next) => {
  let { page } = req.query;
  --page;
  try {
    const data = await Campus.findAndCountAll({
      distinct: true,
      include: Student,
      attributes: {
        include: [
          [
            db.literal(`(
              SELECT COUNT(*)
              FROM students AS student
              WHERE
                student."campusId" = campus.id
              )`),
            'studentcount',
          ],
        ],
      },
      order: [[db.literal('studentcount'), 'DESC']],
      limit: 10,
      offset: 10 * page,
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//GET /api/campuses/sort/byStudents
router.get('/sort/byStudents', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: [{ model: Student }],
    });
    campuses.sort((a, b) => b.students.length - a.students.length);
    res.send(campuses);
  } catch (err) {
    next(err);
  }
});

// POST /api/campuses
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/campuses
router.delete('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    await campus.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT_UPDATE /api/campuses/:campusId
router.put('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    await campus.update(req.body);
    res.status(200).send(campus);
  } catch (err) {
    next(err);
  }
});

//GET /api/campuses/:id
router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: [{ model: Student }],
    });
    res.send(campus);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
