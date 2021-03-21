const router = require('express').Router();
const Student = require('../db/models/Student');

// GET /api/students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(201).send(students);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
