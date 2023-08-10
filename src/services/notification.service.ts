import { INotificaton, IPaginatedNotification } from '../interfaces/notification.interface';
import Notification from '../models/notification.model';

class NotificationService {
    // Get all notifications
    // Specifically for the admin dashboard
    public async getNotifications(limit: number, page: number): Promise<IPaginatedNotification> {
        const skip = (page - 1) * limit
        const query = Notification.find();
        query.sort({
            readStatus: 1,
            timeStamp: -1
        })
        const total = await Notification.countDocuments();

        const notifications = await query.skip(skip).limit(limit).exec()
        return {
            total,
            notifications
        }
    }
    // Make a notification as read if admin has clicked on it
    public async markNotificationAsRead(notificationId: string): Promise<INotificaton | null> {
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { readStatus: true },
            { new: true }
        );
        return notification;
    }

    //   Create a new notification 
    public async createNotification(title: string, message: string, recipient: string) {
        await Notification.create({ title, message, recipient });
    }
}

export default NotificationService;
