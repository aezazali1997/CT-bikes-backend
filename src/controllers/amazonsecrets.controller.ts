import { NextFunction, Request, Response } from 'express';
import { HttpMessage } from '../exceptions/errorMessages';
import AmazonSecretsService from '../services/amazonsecrets.service';
import { AmazonSecretsValidator } from '../validator/amazon';


class AmazonSecretsController {
    service = new AmazonSecretsService()


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
            let errors = AmazonSecretsValidator(data);
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

export default AmazonSecretsController;
