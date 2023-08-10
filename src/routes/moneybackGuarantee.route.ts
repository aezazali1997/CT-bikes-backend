import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import MoneybackGuaranteeController from '../controllers/moneyBack-guarantee.controller';


const MoneybackGuaranteeRoute = Router();
const controller = new MoneybackGuaranteeController();


/** 
 * get MoneybackGuarantee
 * any user can perform this action
 * 
 */
MoneybackGuaranteeRoute.get("/", controller.getMoneybackGuarantee);



/** 
 * update MoneybackGuarantee
 * only admin can perform this action
 * 
 */
MoneybackGuaranteeRoute.patch("/",verifyAdmin, controller.updateMoneybackGuarantee);






export default MoneybackGuaranteeRoute;