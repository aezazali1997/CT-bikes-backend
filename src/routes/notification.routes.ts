import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import NotificationController from '../controllers/notification.controller'


const NotificationRoute = Router();
const notificationController = new NotificationController();
/** 
 * get all notifications
 */
NotificationRoute.get("/", verifyUser, notificationController.getNotifications);


/** 
 * mark a notification as read
 */
NotificationRoute.put("/:id", verifyAdmin, notificationController.markNotificationAsRead);







export default NotificationRoute;