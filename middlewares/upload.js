const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image') {
      cb(null, true);
    } else {
      cb(new multer.MulterError('not an image'));
    }
  },
});

module.exports = upload;
