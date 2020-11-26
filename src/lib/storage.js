const multer = require('multer');
const { User } = require('../../db/models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    User.findOne({ where: { email: req.jwt.email } }).then((user) => {
      const newFilename =        user.id.toString() + new Date().toISOString() + file.originalname;
      cb(null, newFilename);
    });
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb file size
  },
  fileFilter,
});

module.exports = { upload };
