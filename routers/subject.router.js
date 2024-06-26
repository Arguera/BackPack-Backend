const express = require('express');
const router = express.Router();

const { roles: ROLES, fileTypes: FILETYPES } = require('../data/configuration.constants.json');

const { createSubjectValidator, idInParamsValidator } = require('../validators/subject.validators');
const validateFields = require('../middlewares/index.middleware');
const { authentication, authorization } = require('../middlewares/auth.middlewares');
const uploadFile = require('../middlewares/multer.middleware');

const subjectController = require('../controllers/subject.controller');

// /api/subject/...

// Consumo
router.get('/', 
  authentication,
  subjectController.findAll
);
router.get('/degree',
  authentication,
  subjectController.findByDegree
);

// Creacion y mantenimiento
router.post(['/', '/:identifier'], 
  authentication,
  authorization(ROLES.ADMIN),
  uploadFile(FILETYPES.IMAGE),
  createSubjectValidator,
  validateFields, 
  subjectController.save
);

module.exports = router;