const express = require('express');
const router = express.Router();

const { roles: ROLES, fileTypes: FILETYPES } = require('../data/configuration.constants.json');

const { createPostValidator, idInParamsValidator, saveCommentValidator } = require('../validators/post.validators');
const validateFields = require('../middlewares/index.middleware');
const { authentication, authorization } = require('../middlewares/auth.middlewares');
const uploadFile = require('../middlewares/multer.middleware');

const postController = require('../controllers/post.controller');

// /api/post/...  

// Consumo
router.get('/', 
  authentication,
  postController.findAll
);
router.get('/own',
  authentication,
  authorization(ROLES.USER),
  postController.findOwn
);
router.get('/saved',
  authentication,
  authorization(ROLES.USER),
  postController.findSavedPosts
);
router.get('/user/:identifier',
  authentication,
  idInParamsValidator,
  validateFields,
  postController.findByUser
);
router.get('/subject/:identifier',
  authentication,
  idInParamsValidator,
  validateFields,
  postController.findBySubject
);
router.get('/:identifier', 
  authentication,
  idInParamsValidator, 
  validateFields, 
  postController.findOneById
);

// Creacion y mantenimiento
router.post(['/', '/:identifier'], 
  authentication,
  authorization(ROLES.USER),
  uploadFile(FILETYPES.PDF),
  createPostValidator,
  validateFields, 
  postController.save
);

// Modificación e interacción
router.patch('/visibility/:identifier',
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  postController.toggleHidden
);
router.patch('/like/:identifier',
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  postController.likeAPost
);
router.patch('/save/:identifier',
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  postController.saveAPost
);
router.patch('/comment/:identifier',
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  saveCommentValidator,
  validateFields,
  postController.saveComment  
);

// Eliminar
router.delete('/:identifier',
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  postController.deleteById
);

module.exports = router;