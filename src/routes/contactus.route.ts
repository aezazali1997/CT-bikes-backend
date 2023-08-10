import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import ContactusController from '../controllers/contactus.controller';


const ContactusRoute = Router();
const controller = new ContactusController();


/** 
 * get Contactus
 * any user can perform this action
 * 
 */
ContactusRoute.get("/", controller.getContactus);



/** 
 * update Contactus
 * only admin can perform this action
 * 
 */
ContactusRoute.patch("/",verifyAdmin, controller.updateContactus);






export default ContactusRoute;