import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import CouponService from '../services/coupon.service';



class CouponController {
    service = new CouponService();


    /**
     * Create a new coupon
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
            const { code, discount, expirationTime, name } = req.body;
            const discountNumber = Number(discount);

            if (!code || !name || !discountNumber || !expirationTime) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            const coupon = await this.service.create(req.body);
            if (!coupon) return res.status(409).json({ message: 'Coupon Already exists' });

            return res.json({
                message: `${HttpMessage.CREATED}`,
                coupon: coupon,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
   * Get coupon
   * @param req
   * @param res
   * @param next
   */
    public getCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const coupon = await this.service.getCoupon(req.params.id);
            if (!coupon) return res.status(404).json({ message: 'Not Found' });

            return res.json({
                message: `coupon`,
                coupon: coupon,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
   * Get all coupon
   * @param req
   * @param res
   * @param next
   */
    public getAllCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const coupons = await this.service.getAllCoupon(req.query);

            return res.json({
                message: `all coupon`,
                coupon: coupons,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
   * Delete a coupon
   * @param req
   * @param res
   * @param next
   */
    public deleteCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const coupon = await this.service.deleteCoupon(req.params.id);
            if (!coupon)
                return next(new HttpException(HttpCode.NOT_FOUND, "Not Found"));
            return res.json({
                message: `coupon deleted`,
                coupon: coupon,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };





    /**
  * Update coupon
  * @param req
  * @param res
  * @param next
  */
    public updateCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { code, discount, expirationTime, name } = req.body;
            const discountNumber = Number(discount);

            const coupon = await this.service.updateCoupon(req.params.id, code, discountNumber, expirationTime, name);
            if (!coupon) return res.status(404).json({ message: 'Not Found' });

            return res.json({
                message: `updated`,
                coupon: coupon,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };




    /**
   * Apply coupon
   * @param req
   * @param res
   * @param next
   */
    public applyCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { code } = req.body;
            const userId = req.user._id;

            const result = await this.service.applyCoupon(code, userId);
            if (!result) return res.status(404).json({ message: 'Not Found' });
            if (result == HttpMessage.ALREADY_USED) return res.status(400).json({ message: 'Already used!' });
            if (result == HttpMessage.NOT_FOUND) return res.status(404).json({ message: 'Not Found' });
            if (result == HttpMessage.BAD_REQUEST) return res.status(404).json({ message: 'Bad Request' });
            if (result == HttpMessage.EXPIRED) return res.status(404).json({ message: 'Coupon is expired!..' });

            return res.json({
                message: `coupon applied successfully`,
                result,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
  * Remove coupon
  * @param req
  * @param res
  * @param next
  */
    public removeCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { code } = req.body;
            const userId = req.user._id;

            const result = await this.service.removeCoupon(code, userId);
            if (!result) return res.status(404).json({ message: 'Not Found' });
            if (result == HttpMessage.NOT_FOUND) return res.status(404).json({ message: 'cart Not Found' });
            if (result == HttpMessage.BAD_REQUEST) return res.status(400).json({ message: 'Bad Request' });

            return res.json({
                message: `coupon removed successfully`,
                result,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };
    // Search by code
    search = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { query } = req
            let data = await this.service.search(query);
            res.status(HttpCode.OK).json({
                message: "Coupon retrieved succefully",
                coupons: data
            })
        } catch (error: any) {
            res.status(500).json({
                message: error.message || HttpMessage.INTERNAL_SERVER_ERROR
            })
        }
    }



}

export default CouponController;
