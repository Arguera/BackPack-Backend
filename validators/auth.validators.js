const { body } = require('express-validator')

const validators = {};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}/

validators.registerValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 42 }).withMessage('Name format incorrect'),
  body('lastname')
    .notEmpty().withMessage('Lastname is required')
    .isLength({ min: 3, max: 42 }).withMessage('Lasname format incorrect'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email format incorrect'),
  body('degree')
    .notEmpty().withMessage('Degree is required')
    .isMongoId().withMessage('Degree format incorrect'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(passwordRegex).withMessage('Password format incorrect')
];

module.exports = validators;