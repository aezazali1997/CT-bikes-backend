import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import ReturnPolicyController from '../controllers/return-policy.controller';


const ReturnPolicyRoute = Router();
const controller = new ReturnPolicyController();


/** 
 * get ReturnPolicy
 * any user can perform this action
 * 
 */
ReturnPolicyRoute.get("/", controller.getReturnPolicy);



/** 
 * update ReturnPolicy
 * only admin can perform this action
 * 
 */
ReturnPolicyRoute.patch("/",verifyAdmin, controller.updateReturnPolicy);






export default ReturnPolicyRoute;