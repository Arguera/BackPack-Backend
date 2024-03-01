const multer = require('multer');
const debug = require('debug')('app:multer-controller');

function uploadFile(fileType) {

  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const name = file.originalname.split('.').shift();
      cb(null, name + '-' + uniqueSuffix)
    }
  }); 
  
  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5E6, // 5MB
      files: 1,
    },
    fileFilter: (req, file, cb) => {
      const type = file.mimetype.startsWith(fileType);
      if(!type) {
        return cb(new Error('File type not allowed'), false);
      } else {
        cb(null, true);
      }
    }, 
  }).single('file');

  return upload;
}

module.exports = uploadFile;