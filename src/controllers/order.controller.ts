import { NextFunction, Request, Response, response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import Orderservice from '../services/order.service';
import { createOrder, updateOrder, updateOrderAdmin } from '../validator/order';
import CartService from '../services/cart.service';
import productModel from '../models/product.model';
import cartModel from '../models/cart.model';
import NotificationService from '../services/notification.service';
import { NotificationTitle, NotificationMessage } from '../constants/global.consants'
import { IOrder } from '../interfaces/order.interface';



class OrderController {
    service = new Orderservice();
    cartService = new CartService();
    notificService = new NotificationService()

    /**
     * Create a new order
     * @param req
     * @param res
     * @param next
     */
    public create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            // if (!req.body.items || req.body.items.lenght == 0)
            //     return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));

            let { error } = await createOrder(req.body);
            if (error) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
            }
            req.body.user = req.user.id;

            // find the cart
            let cart = await cartModel.findById({ _id: req.body.cartId });
            if (!cart || cart.items.length == 0)
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));

            // check the quantity in stock 
            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i];
                const product = await productModel.findById(item.productId);

                if (product && item.quantity > product.quantity_in_stock) {
                    return next(new HttpException(HttpCode.BAD_REQUEST, `The quantity of ${product.title} in the order (${item.quantity}) exceeds the available quantity in stock (${product.quantity_in_stock}).`));
                }
            }
            //creating order
            cart.items.forEach((item: any) => {
                delete item.quantity_in_stock;
            });
            req.body.items = cart.items;
            req.body.discount = cart.discount;
            req.body.subtotal = cart.subtotal;
            req.body.total_items = cart.total_items;
            const order = await this.service.create(req.body);
            // empty user cart after order create
            await this.cartService.deleteCart(order.user)
            // create a notification for the admin
            await this.notificService.createNotification(NotificationTitle.Order,
                NotificationMessage.NewOrder,
                req.user.id
            )
            return res.json({
                message: `order ${HttpMessage.CREATED}`,
                order: order._id,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
        }
    };


    /**
    * Get all Orders for a User
    * @param req
    * @param res
    * @param next
    */
    public getallOrders = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const orders = await this.service.getallOrders(req.query, req.params.userId);
            return res.json({
                message: "all orders",
                orders: orders,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
        }
    };



    /**
   * Get order
   * @param req
   * @param res
   * @param next
   */
    public getOrder = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const order = await this.service.getOrder(req.params.orderId);
            if (!order) {
                return next(new HttpException(HttpCode.NOT_FOUND, `${HttpMessage.NOT_FOUND}` || "Bad Request"));
            }

            return res.json({
                message: "order",
                order: order,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
  * Update order By User
  * @param req
  * @param res
  * @param next
  */
    public updateOrderUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const { error } = await updateOrder(req.body);
            if (error)
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));


            let order = await this.service.updateOrderUser(req.body, req.params.orderId);
            if (!order) {
                return next(new HttpException(HttpCode.NOT_FOUND, `${HttpMessage.NOT_FOUND}` || "Bad Request"));
            }


            if (order == HttpMessage.CANNAT_UPDATE) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Cannot Update Order Status after being Shipped"));
            }
            await this.notificService.createNotification(
                NotificationTitle.UpdateOrder,
                NotificationMessage.UpdateOrder,
                order["id"]
            )
            return res.json({
                message: "order updated",
                order: order,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
      * Update order By Admin
      * @param req
      * @param res
      * @param next
      */
    public updateOrderAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const { error } = await updateOrderAdmin(req.body);
            if (error)
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));

            console.log(req.params.orderId)
            let order = await this.service.updateOrderAdmin(req.params.orderId, req.body);
            if (order == HttpMessage.NOT_FOUND) {
                return next(new HttpException(HttpCode.NOT_FOUND, `${HttpMessage.NOT_FOUND}` || "Not Found"));
            }
            if (order == HttpMessage.BAD_REQUEST) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            return res.json({
                message: "order updated",
                order: order,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    totalOrders = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const { startDate, endDate } = req.body
            let ordersCount = await this.service.getAllOrdersCount(startDate, endDate);

            return res.json({
                message: "order count",
                order: ordersCount,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
        }
    }


    /**
      * Get orders By Status/createdAt/isPaid
      * @param req
      * @param res
      * @param next
      */
    public getAllOrdersAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const status: any = Number(req.query.status);
            if (status && status < 1 || status > 6) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }
            let orders = await this.service.getAllOrdersAdmin(req.query);

            return res.json({
                message: "order",
                order: orders,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };

    /**
 * @param req
 * @param res
 * @param next
 */
    public getAllPendingOrders = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { startDate, endDate } = req.body
            const pendingOrdersCount = await this.service.getAllPendingOrdersCount(startDate, endDate)

            res.json({
                message: 'Pending orders retrieved successfully',
                totalPendingOrders: pendingOrdersCount,

            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };
    public averageDailySale = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

            const averageDailySales = await this.service.getAverageDailySales(startDate, endDate)

            res.json({
                message: 'Daily sales retrieved successfully',
                sales: averageDailySales,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
    public totalEarnings = async (req: Request,
        res: Response, next: NextFunction) => {
        try {
            const { startDate, endDate } = req.body;
            const totalEarnings = await this.service.totalEarnings(startDate, endDate);
            return res.status(HttpCode.OK).json({
                message: 'Total Earnings recieved',
                Earnings: totalEarnings
            })

        } catch (error: any) {
            res.status(500).json({ message: error.message || HttpMessage.INTERNAL_SERVER_ERROR })
        }
    }
    public revenue = async (req: Request, res: Response) => {
        const { year } = req.body
        try {
            let data = await this.service.revenueProfit(year);
            return res.status(HttpCode.OK).json({
                message: "Revenue",
                data: data
            })
        } catch (error: any) {
            res.status(500).json({
                message: error.message || HttpMessage.INTERNAL_SERVER_ERROR
            })
        }
    }




}

export default OrderController;
