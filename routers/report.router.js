const express = require('express');
const router = express.Router();

const { roles: ROLES } = require('../data/configuration.constants.json');

const { createReportValidator } = require('../validators/report.validators');

const validateFields = require('../middlewares/index.middleware');
const { authentication, authorization } = require('../middlewares/auth.middlewares');

const reportController = require('../controllers/report.controller');

// /api/report/...

// Consumo
router.get('/', 
  authentication,
  authorization(ROLES.ADMIN),
  reportController.findAll
);

// Creacion y mantenimiento
router.post('/', 
  authentication,
  createReportValidator,
  validateFields, 
  reportController.save
);

module.exports = router;