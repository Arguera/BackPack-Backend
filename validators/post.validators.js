const { body, param } = require('express-validator');
const validators = {};

validators.createPostValidator = [
  param('identifier')
    .optional()
    .isMongoId().withMessage('Identifier must be a valid Mongo Id'),
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('topics')
    .notEmpty().withMessage('Topics is required'),
    // .isArray().withMessage('Topics must be an array'),
  body('publication_year')
    .notEmpty().withMessage('Publication year is required')
    .isNumeric().withMessage('Publication year must be a number')
    .isLength({ min: 4, max: 4 }).withMessage('Publication year must be 4 digits'),
  body('publication_cycle')
    .notEmpty().withMessage('Publication cycle is required')
    .isNumeric().withMessage('Publication cycle must be a number')
    .isInt([1, 2, 3]).withMessage('Publication cycle must be 1, 2 or 3'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string'),
  body('subject')
    .notEmpty().withMessage('Subject is required')
    .isMongoId().withMessage('Subject must be a valid Mongo Id')
];

validators.idInParamsValidator = [
  param('identifier')
    .notEmpty().withMessage('Identifier is required')
    .isMongoId().withMessage('Identifier must be a valid Mongo Id')
];

validators.saveCommentValidator = [
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 280 }).withMessage('Content max is 280 characters'),
  body('_id')
    .optional()
    .notEmpty().withMessage('_id is required')
    .isMongoId().withMessage('Identifier must be a valid Mongo Id')
];

module.exports = validators;