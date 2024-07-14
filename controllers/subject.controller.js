const Subject = require('../models/Subject.model');
const fs = require('fs');
const { uploadFile } = require('../utils/cloudinary.tools');

const debug = require('debug')('app:subject-controller');

const controller = {};

controller.save = async (req, res, next) => {
  try {
    const { code, name, degree } = req.body;
    const file = req.file;

    const { identifier } = req.params;
    const { user } = req;

    let subject = await Subject.findById(identifier);

    if(!subject) {
      subject = new Subject();
      subject['user'] = user._id;
    } 

    const image = await uploadFile(file.path, file.filename);

    fs.unlinkSync(file.path), (error) => {
      if(error) {
        console.error(error);
        return;
      }
    };

    if(!image) {
      return res.status(409).json({ error: 'Error uploading image' });
    }

    subject['code'] = code;
    subject['name'] = name;
    subject['degree'] = degree;
    subject['image'] = image.url;

    const subjectSaved = await subject.save();
    if(!subjectSaved) {
      return res.status(409).json({ error: 'Error creating subject' });
    }
    
    return res.status(201).json(subjectSaved);
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const subjects = await Subject.find();

    return res.status(200).json({ subjects });
  } catch (error) {
    next(error);
  }
}

controller.findByDegree = async (req, res, next) => {
  try {
    const { degree } = req.user;
    const subjects = await Subject.find({ name: degree });

    return res.status(200).json({ subjects });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;