const router = require('express').Router();
const {
  models: { Campus, Student },
} = require('../db/index');

// GET /api/campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({ include: [{ model: Student }] });
    res.status(201).send(campuses);
  } catch (err) {
    console.error(err);
  }
});

// POST /api/campuses
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (err) {
    console.error(err);
  }
});

// DELETE /api/campuses
router.delete('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId);
    await campus.destroy();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

//GET /api/campuses/:id
router.get('/:campusId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.campusId, {
      include: [{ model: Student }],
    });
    res.status(201).send(campus);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
