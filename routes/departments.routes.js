const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', DepartmentController.getAll);

router.get('/departments/:id', DepartmentController.getById);

router.post('/departments', DepartmentController.post);

router.put('/departments/:id', DepartmentController.put);

router.delete('/departments/:id', DepartmentController.delete);

module.exports = router;