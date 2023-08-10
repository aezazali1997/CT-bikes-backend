import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import NotificationController from '../controllers/notification.controller'
import { Order } from '../types/order';


const OrderRoute = Router();
const controller = new OrderController();
const notifController = new NotificationController();
/** 
 * create a order
 * user can perform this action
 * later we will add authencation layer on this route
*/
OrderRoute.post("/", verifyUser, controller.create, notifController.createNotification);

OrderRoute.get("/pending-order", verifyAdmin, controller.getAllPendingOrders)



OrderRoute.get("/average-daily-sale", verifyAdmin, controller.averageDailySale)


OrderRoute.get("/total-earnings", verifyAdmin, controller.totalEarnings)


OrderRoute.get('/total-orders', verifyAdmin, controller.totalOrders);

/** 
 * get  orders by  statuses/createdAt/ispaid
 *  Admin can perform this action
 * 
 */
OrderRoute.get("/all-orders", verifyAdmin, controller.getAllOrdersAdmin);

/** 
 * get a order by ID
 * user can get his own order 
 * 
 */
OrderRoute.get("/:orderId", verifyUser, controller.getOrder);


/** 
 * get all orders for a user 
 * any user can perform this action
 * 
 */
OrderRoute.get("/user/:userId", verifyUser, controller.getallOrders);




/** 
 * update order status and shipping address by user
 * user can update his order status to cancel or shipping address
 * later we will add authencation layer on this route
 */
OrderRoute.patch("/order-user/:orderId", verifyUser, controller.updateOrderUser, notifController.createNotification);



/** 
 * update order by admin
 * admin can update order status, shipping address, user info, products etc
 * later we will add authencation layer on this route
 */
OrderRoute.patch("/order-admin/:orderId", verifyAdmin, controller.updateOrderAdmin);


/***
 * Monthly Revenue
 */
OrderRoute.post('/revenue', verifyAdmin, controller.revenue)






export default OrderRoute;