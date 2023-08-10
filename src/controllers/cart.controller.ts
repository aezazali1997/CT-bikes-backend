import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import CartService from '../services/cart.service';
import mongoose from 'mongoose';


class CartController {
    service = new CartService();


    /**
     * Create a new cart || add to cart
     * @param req
     * @param res
     * @param next
     */
    public addTocart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (
                !req.body.productId ||
                !mongoose.Types.ObjectId.isValid(req.body.productId)
                //  !req.body.quantity ||
                // isNaN(req.body.quantity)
            ) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            //  req.body.userId = req.user?._id;
            const cart: any = await this.service.addTocart(req.user?._id, req.body.productId);
            if (cart == HttpMessage.NOT_FOUND) {
                return next(new HttpException(HttpCode.NOT_FOUND, HttpMessage.NOT_FOUND));
            }
            if (cart == HttpMessage.QUANTITY_OUR_OF_STOCK) {
                return next(new HttpException(HttpCode.BAD_REQUEST, HttpMessage.QUANTITY_OUR_OF_STOCK));
            }
            return res.json({
                message: `product added to cart`,
                cart: cart,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


    /**
    * Remove from cart 
    * @param req
    * @param res
    * @param next
    */
    public removeFromCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            let userId = req.user?._id;
            let productId = req.params.productId as string;
            if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }
            const cart: any = await this.service.removeFromCart(userId, productId);
            if (cart == HttpMessage.NOT_FOUND) {
                return res.status(404).json({ message: `cart ${HttpMessage.NOT_FOUND}` });
            }
            if (cart.error) {
                return res.status(404).json({ message: cart.error, });
            }
            return res.json({
                message: `product removed from  cart`,
                cart: cart,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };



    /**
     * Get a cart
     * @param req id
     * @param res
     * @param next
     */
    public getCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const cart = await this.service.getCart(req.user.id);
            if (!cart)
                return res.json({
                    message: "cart is empty",
                    cart: []
                });

            return res.json({
                message: "cart",
                cart: cart,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


    /**
     * Update a cart
     * @param req
     * @param res
     * @param next
     */
    public updateCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            if (
                !req.body.productId ||
                !mongoose.Types.ObjectId.isValid(req.body.productId) ||
                !req.body.quantity ||
                req.body.quantity <= 0 ||
                isNaN(req.body.quantity)
            ) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }
            const cart = await this.service.updateCart(req.user?.id, req.body.productId, req.body.quantity);
            if (!cart) {
                return next(new HttpException(HttpCode.NOT_FOUND, `cart ${HttpMessage.NOT_FOUND}`));
            }
            if (cart == HttpMessage.NOT_FOUND) {
                return next(new HttpException(HttpCode.NOT_FOUND, `product  ${HttpMessage.NOT_FOUND} in cart`));
            }
            return res.json({
                message: "cart updated",
                cart: cart,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


    /**
     * Delete a cart
     * @param req id
     * @param res
     * @param next
     */
    public deleteCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const cart = await this.service.deleteCart(req.user?.id);
            if (!cart)
                return res.json({
                    message: "cart is empty",
                    cart: []
                });

            return res.json({
                message: "cart deleted",
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };






}

export default CartController;
