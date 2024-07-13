const { body, param } = require('express-validator');
const validators = {};

validators.createDegreeValidator = [
    body('code')
        .notEmpty().withMessage('Code is required')
        .isString().withMessage('Code must be a string'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
];

validators.idInParamsValidator = [
    param('identifier')
        .notEmpty().withMessage('Identifier is required')
        .isMongoId().withMessage('Identifier must be a valid Mongo Id')
];

module.exports = validators;