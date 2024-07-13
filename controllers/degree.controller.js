const Degree = require('../models/degree.model.js');
const { roles: ROLES } = require('../data/configuration.constants.json');

const controller = {};

controller.saveDegree = async (req, res, next) => {
  try {
    const { code, name } = req.body;

    const degree = await Degree.findOne({ code: code });

    if(degree) {
      return res.status(409).json({ error: 'Degree already exists!' });
    }

    const newDegree = new Degree({
      code: code,
      name: name
    });

    await newDegree.save();

    return res.status(201).json({ message: 'Degree created' });
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const degrees = await Degree.find();

    return res.status(200).json({ degrees });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;