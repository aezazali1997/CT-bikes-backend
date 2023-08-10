import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import AboutusController from '../controllers/aboutus.controller';


const AboutusRoute = Router();
const controller = new AboutusController();


/** 
 * get about-us
 * any user can perform this action
 * 
 */
AboutusRoute.get("/", controller.getAboutus);



/** 
 * update about-us
 * only admin can perform this action
 * 
 */
AboutusRoute.patch("/",verifyAdmin, controller.updateAboutus);






export default AboutusRoute;