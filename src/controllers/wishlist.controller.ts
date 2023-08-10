import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import WishlistService from '../services/wishlist.service';
import mongoose from 'mongoose';


class WishlistController {
    service = new WishlistService();


    /**
     * Add to wishlist
     * @param req
     * @param res
     * @param next
     */
    public addtoWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const { productId } = req.body;
            if (!productId || !mongoose.Types.ObjectId.isValid(productId))
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));


            const wishlist = await this.service.addtoWishlist(req.user.id, productId);
            if (wishlist == HttpMessage.NOT_FOUND) return res.status(404).json({ message: 'Product Not Found' });

            return res.json({
                message: `Added to Wishlist`,
                wishlist: wishlist,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };




    /**
       * Remmove a product from wishlist
       * @param req
       * @param res
       * @param next
       */
    public removefromWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const { productId } = req.body;
            if (!productId || !mongoose.Types.ObjectId.isValid(productId))
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));

            const wishlist = await this.service.removefromWishlist(req.user.id, productId);
            if (wishlist == HttpMessage.NOT_FOUND) return res.status(404).json({ message: 'Product Not Found' });
            if (wishlist == HttpMessage.NO_CONTENT) return res.status(400).json({ message: 'Wishlist is Empty' });

            return res.json({
                message: `Removed from Wishlist`,
                wishlist: wishlist,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
       * Get user   wishlist 
       * @param req
       * @param res
       * @param next
       */
    public getWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const wishlist = await this.service.getWishlist(req.query, req.user.id);

            return res.json({
                message: `Wishlist`,
                wishlist: wishlist,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
     * Delete user wishlist
     * @param req
     * @param res
     * @param next
     */
    public deleteWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const wishlist = await this.service.deleteWishlist(req.user.id);
            if (!wishlist) {
                return next(new HttpException(HttpCode.NOT_FOUND, `user don,t have any  wishlist`));
            }
            return res.json({
                message: "wishlist deleted",
                wishlist: wishlist,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };




}

export default WishlistController;
