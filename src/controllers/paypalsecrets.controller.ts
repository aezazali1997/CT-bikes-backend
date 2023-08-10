import { NextFunction, Request, Response } from 'express';
import PayPalSecretsService from '../services/paypalsecrets.service';
import { HttpMessage } from '../exceptions/errorMessages';
import { PayPalSecretsValidator } from '../validator/paypal';


class PayPalSecretsController {
    service = new PayPalSecretsService()


    /**
    * Get 
    * @param req
    * @param res
    * @param next
    */
    public getSecrets = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const response = await this.service.get();
            return res.status(200).json(response);

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
        }
    };


    /**
     * Post 
     * @param req
     * @param res
     * @param next
     */
    public addSecret = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = req.body
            let errors = PayPalSecretsValidator(data);
            const response = await this.service.create(data);
            return res.status(200).json(response);

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
        }
    };



    /** 
    * Delete
    * @param req
    * @param res
    * @param next
    */
    public deleteSecret = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            await this.service.delete(id);
            return res.json({
                message: 'Secrets removed succesfully'
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


}

export default PayPalSecretsController;
