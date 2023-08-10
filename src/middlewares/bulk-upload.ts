import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { publicDir } from '../config/storage';



// Create a storage engine for multer
// const storage = multer.diskStorage({
//   destination: publicDir,
//   filename: function (req: Request, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

const storage = multer.memoryStorage();
// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 200000000 }, // Increase file size limit to 10MB
  fileFilter: function (req: Request, file, cb) {
    checkFileType(file, cb);
  }
});

// Define file type checking function
function checkFileType(file: any, cb: any) {
 // console.log(file.mimetype);//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  const filetypes = /(csv|xlsx|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)/;
    //const filetypes = /\.(csv|xlsx)$/i;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      let err = { message: "Only CSV and Excel files allowed", status: 400 };
      cb(err);
    }
  }
  

// Export middleware for single file upload
export const bulkUpload = upload.single('file');

