import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import UploadController from '../controllers/upload.controller';
import { uploadMultiple, uploadSingle } from '../middlewares/storage';



const UploadRoute = Router();
const controller = new UploadController();

/** 
 * upload single file
 * main_image of the product
 * admin can perform this action
 * 
 */
UploadRoute.post("/file", verifyAdmin, uploadSingle, controller.uploadFile);


/** 
 * upload multiple files
 * others images of the product
 * admin can perform this action
 * 
 */
UploadRoute.post("/files", verifyAdmin, uploadMultiple, controller.uploadFiles);


/** 
 * delete a file/product image (no apply for main_image deletion)
 * main_image can be deleted after replacing with new one
 * admin can perform this action
 * 
 */
UploadRoute.delete("/file",verifyAdmin, controller.deleteImage);

/** 
 * update main_image of the product
 * main_image can be deleted after replacing with new one
 * admin can perform this action
 * 
 */
UploadRoute.put("/file",verifyAdmin, controller.updateMainImage);









export default UploadRoute;