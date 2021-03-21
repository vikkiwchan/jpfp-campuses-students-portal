const router = require('express').Router();
const Campus = require('../db/models/Campus');

// GET /api/campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.status(201).send(campuses);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
