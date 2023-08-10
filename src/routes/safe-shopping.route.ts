import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import SafeShoppingController from '../controllers/safeShopping.controller';




const SafeShoppingRoute = Router();
const controller = new SafeShoppingController();


/** 
 * get appstore
 * any user can perform this action
 * 
 */
SafeShoppingRoute.get("/", controller.getSafeShopping);



/** 
 * update appstore
 * only admin can perform this action
 * 
 */
SafeShoppingRoute.patch("/",verifyAdmin, controller.updateSafeShopping);






export default SafeShoppingRoute;