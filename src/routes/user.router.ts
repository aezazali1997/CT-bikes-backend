import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { verifyUser } from '../middlewares/jwt';


const UserRoute = Router();
const controller = new UserController();

/** 
 * create new user
 * any user can sign up
 * 
 */
UserRoute.post("/signup", controller.signup);

/** 
 * user login
 * any user can perform this action
 * 
 */
UserRoute.post("/login", controller.login);


/** 
 * forget password send mail
 * 
 */
UserRoute.post("/forget-password", controller.sendMailForgetPassword);


/** 
 * reset password
 * 
 */
UserRoute.post("/reset-password", controller.resetPassword);


/** 
 * change password
 * 
 */
UserRoute.post("/change-password", verifyUser, controller.changePassword);


UserRoute.put('/:userId', verifyUser, controller.updateUser)

export default UserRoute;