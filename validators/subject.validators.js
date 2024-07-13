const { body, param } = require('express-validator');
const validators = {};

validators.createSubjectValidator = [
  param('identifier')
    .optional()
    .isMongoId().withMessage('Identifier must be a valid Mongo Id'),
  body('code')
    .notEmpty().withMessage('Code is required')
    .isString().withMessage('Code must be a string'),
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('degree')
    .notEmpty().withMessage('Degree is required')
    .isArray().withMessage('Degree must be an array')
];

validators.idInParamsValidator = [
  param('identifier')
    .notEmpty().withMessage('Identifier is required')
    .isMongoId().withMessage('Identifier must be a valid Mongo Id')
];

module.exports = validators;