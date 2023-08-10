import { Router } from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import SocialMediaController from '../controllers/social-media.controller';
import { uploadSingle } from '../middlewares/storage';


const SocialMediaRoute = Router();
const controller = new SocialMediaController();

/** 
 * create social-media
 * admin can perform this action
 * 
 */
SocialMediaRoute.post("/",verifyAdmin,uploadSingle, controller.createSocialMedia);


/** 
 * get all social-media
 * any user can perform this action
 * 
 */
SocialMediaRoute.get("/", controller.getAllSocialMedia);


/** 
 * get social-media
 * any user can perform this action
 * 
 */
SocialMediaRoute.get("/:id",verifyAdmin, controller.getSocialMedia);


/** 
 * delete social-media
 * admin can perform this action
 * 
 */
SocialMediaRoute.delete("/:id",verifyAdmin, controller.deleteSocialMedia);


/** 
 * update social-media
 * only admin can perform this action
 * 
 */
SocialMediaRoute.patch("/",verifyAdmin,uploadSingle, controller.updateSocialMedia);


export default SocialMediaRoute;