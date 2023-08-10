import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import OrderTrackingService from '../services/order-tracking.service';


class OrderTrackingController {
    service = new OrderTrackingService();


    /**
     * Get OrderTracking
     * @param req
     * @param res
     * @param next
     */
    public getOrderTracking = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const orderTracking = await this.service.getOrderTracking();
            if (!orderTracking) {
                return next(new HttpException(HttpCode.NOT_FOUND, `orderTracking ${HttpMessage.NOT_FOUND}`));
            }
            return res.json({
                message: "orderTracking",
                orderTracking: orderTracking,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
    * Update OrderTracking
    * @param req
    * @param res
    * @param next
    */
    public updateOrderTracking = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (req.files && Array.isArray(req.files)) {
                const images = req.files.map((file: any) => {
                    return {
                        url: `http://localhost:8000/public/${file.filename}`
                    };
                });
                req.body.images = images;
            }


            const orderTracking = await this.service.updateOrderTracking(req.body);
            if (!orderTracking) return next(new HttpException(HttpCode.NOT_FOUND, `orderTracking ${HttpMessage.NOT_FOUND}`));
            return res.json({
                message: "updated",
                orderTracking: orderTracking,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


}

export default OrderTrackingController;
