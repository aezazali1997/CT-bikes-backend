import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import AppstoreController from '../controllers/appstore.controller';
import { uploadSingle } from '../middlewares/storage';


const AppstoreRoute = Router();
const controller = new AppstoreController();


/** 
 * get appstore
 * any user can perform this action
 * 
 */
AppstoreRoute.get("/", controller.getAppstore);



/** 
 * update appstore
 * only admin can perform this action
 * 
 */
AppstoreRoute.patch("/",verifyAdmin,uploadSingle, controller.updateAppstore);






export default AppstoreRoute;