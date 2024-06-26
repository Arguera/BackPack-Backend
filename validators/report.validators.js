const { body, param } = require('express-validator');
const validators = {};

validators.createReportValidator = [
    body('reportCause')
        .notEmpty().withMessage('Report cause is required')
        .isArray().withMessage('Report cause must be an array'),
    body('post')
        .notEmpty().withMessage('Report is required')
        .isMongoId().withMessage('Report must be a valid Mongo Id')
];

module.exports = validators;