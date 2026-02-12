const Employees = require('../models/employees.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employees.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employees.findOne().populate('department').skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Employees.findById(req.params.id).populate('department');
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployees = new Employees({ firstName: firstName, lastName: lastName, department: department });
    await newEmployees .save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const dep = await Employees.findById(req.params.id);
    if(dep) {
      await Employees.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Employees.findById(req.params.id);
    if(dep) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};