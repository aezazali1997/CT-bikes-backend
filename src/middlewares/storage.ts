import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { filesDir, publicDir, sliderDir } from '../config/storage';
import { API_BASE_PATH } from '../config';


// Function to determine the destination directory based on the file type
function getDestination(req: Request, file: any, cb: any) {
  if (req.originalUrl === `${API_BASE_PATH}/slider`) {
    cb(null, sliderDir);
  }
  else if (req.path === `/file` || req.path === `/files`) {
    cb(null, filesDir);
  } else {
    cb(null, publicDir);
  }
}

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: getDestination,
  filename: function (req: Request, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // Increase file size limit to 10MB
  fileFilter: function (req: Request, file, cb) {
    checkFileType(file, cb);
  }
});

// Define file type checking function
function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    let err = { message: "Images only", status: 400 }
    cb(err);
  }
}

// Export middleware for single file upload
export const uploadSingle = upload.single('image');

// generall setting page
// export const favicon = upload.single('favicon');
// export const siteLogo = upload.single('siteLogo');

// Export middleware for multiple files upload
export const uploadMultiple = upload.array('images', 10);
