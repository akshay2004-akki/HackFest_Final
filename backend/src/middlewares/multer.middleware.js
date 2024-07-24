import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const allowedNames = ['Lights.jpg', 'Compost.jpg', 'Transport.jpg', 'Recycle.jpg'];

const fileFilter = (req, file, cb) => {
  if (allowedNames.includes(file.originalname)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only images that help in reducing carbon footprints are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter
});
