import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import NotificationService from '../services/notification.service';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants/global.consants'
class NotificationController {
    service = new NotificationService();

    //  Get all the notifications for the app
    public getNotifications = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const limit = req.query.limit || DEFAULT_LIMIT
            const page = req.query.page || DEFAULT_PAGE
            // plus sign with limit and page for conversion from string to number
            const notifications = await this.service.getNotifications(+limit, +page);

            if (!notifications) {
                throw new HttpException(HttpCode.NOT_FOUND, `Notifications not found`);
            }

            return res.send({ notifications });
        } catch (error: any) {
            next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}`));
        }
    };

    /**
     * Mark a notification as read
     * @param req
     * @param res
     * @param next
     */
    public markNotificationAsRead = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const notificationId = req.params.id;
            const notification = await this.service.markNotificationAsRead(notificationId);

            if (!notification) {
                throw new HttpException(HttpCode.NOT_FOUND, `Notification not found`);
            }

            return res.send({ notification });
        } catch (error: any) {
            next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}`));
        }
    };

    /**
     * Create a new notification
     * @param req
     * @param res
     * @param next
     */
    public createNotification = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { title, message, recipient } = req.body;
            await this.service.createNotification(title, message, recipient);
        } catch (error: any) {
            next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}`));
        }
    };
}

export default NotificationController;
