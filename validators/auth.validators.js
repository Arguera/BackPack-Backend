const { body } = require('express-validator')

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}/

validators.registerValidator = [
  body('carnet')
    .notEmpty().withMessage('Carnet is required')
    .isLength({ min: 8, max: 8 }).withMessage('Carnet format incorrect'),
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 4, max: 42 }).withMessage('Name format incorrect'),
  body('lastname')
    .notEmpty().withMessage('Lastname is required')
    .isLength({ min: 4, max: 42 }).withMessage('Lasname format incorrect'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email format incorrect'),
  body('degree')
    .notEmpty().withMessage('Degree is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(passwordRegexp).withMessage('Password format incorrect')
];

module.exports = validators;