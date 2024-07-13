const { body, param } = require('express-validator');
const validators = {};

validators.createDegreeValidator = [
    body('code')
];