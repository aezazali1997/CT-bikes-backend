import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import EbaySecretsService from '../services/ebaysecrets.service';
import { EbaySecretsValidator } from '../validator/ebay.secrets';


class EbaySecretsController {
    service = new EbaySecretsService()


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
            let errors = EbaySecretsValidator(data);
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

export default EbaySecretsController;
