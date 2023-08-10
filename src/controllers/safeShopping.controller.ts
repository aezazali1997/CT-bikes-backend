import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import safeShoppingService from '../services/safeShopping.service';



class SafeShoppingController {
    service = new safeShoppingService();


    /**
     * Get safeShopping
     * @param req
     * @param res
     * @param next
     */
    public getSafeShopping = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const safeShopping = await this.service.getSafeShopping();
            if (!safeShopping) {
                return next(new HttpException(HttpCode.NOT_FOUND, `safeShopping ${HttpMessage.NOT_FOUND}`));
            }
            //const text = `<div>${safeShopping.text.replace(/\n/g, "<br>")}</div>`;

            return res.send({
                safeShopping: safeShopping
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
    * Update   safeShopping
    * @param req
    * @param res
    * @param next
    */
    public updateSafeShopping = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const safeShopping = await this.service.updateSafeShopping(req.body.text);
            if (!safeShopping) return next(new HttpException(HttpCode.NOT_FOUND, `safeShopping ${HttpMessage.NOT_FOUND}`));

            //const text = `<div>${aboutus.text.replace(/\n/g, "<br>")}</div>`;

            return res.send({
                safeShopping
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


}

export default SafeShoppingController;
