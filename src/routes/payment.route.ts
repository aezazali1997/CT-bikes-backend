import { Router } from 'express';
import { verifyUser } from '../middlewares/jwt';
import PaymentController from '../controllers/payment.controller';


const PaymentRoute = Router();
const controller = new PaymentController();

/** 
 * create a payment
 * user can perform this action
 * 
 */
//PaymentRoute.get("/pay/:orderId", controller.createPayment);
PaymentRoute.get("/pay/:orderId",verifyUser, controller.createPayment);

/** 
 * upon creating  paymentobject paypal will redirect here
 * we have to some order info after payment successfull
 * this route will be call from success page of frontend
 * 
 */
PaymentRoute.get("/success", controller.successPayment);


/** 
 * cancel payment
 * when user cancel the payment
 * 
 */
PaymentRoute.get("/cancel", controller.cancelPayment);













export default PaymentRoute;