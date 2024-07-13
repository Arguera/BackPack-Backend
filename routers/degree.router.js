const express = require('express');
const router = express.Router();
const debug = require('debug')('app:degree-controller');

const { roles: ROLES } = require('../data/configuration.constants.json');
const { createDegreeValidator, idInParamsValidator } = require('../validators/degree.validator');
const validateFields = require('../middlewares/index.middleware');
const degreeController = require('../controllers/degree.controller');
const { authentication, authorization } = require('../middlewares/auth.middlewares');


router.get('/',
  degreeController.findAll
);

router.post('/',
  authentication,
  authorization(ROLES.USER),
  validateFields,
  degreeController.saveDegree
);

module.exports = router;