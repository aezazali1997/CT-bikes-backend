import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import GeneralSettingController from '../controllers/general.setting.controller';


const GeneralSettingRoute = Router();
const controller = new GeneralSettingController();


/** 
 * get appstore
 * any user can perform this action
 * 
 */
GeneralSettingRoute.get("/", controller.getGeneralSetting);



/** 
 * update appstore
 * only admin can perform this action
 * 
 */
GeneralSettingRoute.patch("/",verifyAdmin, controller.updateGeneralSetting);






export default GeneralSettingRoute;