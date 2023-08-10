import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import OrderTrackingController from '../controllers/order-tracking.controller';
import { uploadMultiple } from '../middlewares/storage';


const OrderTrackingRoute = Router();
const controller = new OrderTrackingController();


/** 
 * get OrderTracking
 * any user can perform this action
 * 
 */
OrderTrackingRoute.get("/", controller.getOrderTracking);



/** 
 * update OrderTracking
 * only admin can perform this action
 * 
 */
OrderTrackingRoute.patch("/", verifyAdmin, uploadMultiple, controller.updateOrderTracking);






export default OrderTrackingRoute;