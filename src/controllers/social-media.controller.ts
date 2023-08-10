import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import SocialMediaService from '../services/social-media.service';



class SocialMediaController {
    service = new SocialMediaService();


    /**
    * Create SocialMedia
    * @param req
    * @param res
    * @param next
    */
    public createSocialMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const image = {
                url: `http://localhost:8000/public/${req.file?.filename}`
            }

            req.body.image = image;
            const socialMedia = await this.service.createSocialMedia(req.body);
            if (socialMedia == HttpMessage.CONFLICT) {
                return next(new HttpException(HttpCode.CONFLICT, `socialMedia ${HttpMessage.CONFLICT}`));
            }
            return res.status(201).send({
                message: "created",
                socialMedia: socialMedia
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
     * Get Social Media
     * @param req
     * @param res
     * @param next
     */
    public getSocialMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const socialMedia = await this.service.getSocialMedia(req.params.id);
            if (!socialMedia) {
                return next(new HttpException(HttpCode.NOT_FOUND, `socialMedia ${HttpMessage.NOT_FOUND}`));
            }

            return res.send({
                socialMedia
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
     * Get All Social Media
     * @param req
     * @param res
     * @param next
     */
    public getAllSocialMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const socialMedia = await this.service.getAllsocialMedia(req.query);
            return res.json({
                socialMedia
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
     * Delete Social Media
     * @param req
     * @param res
     * @param next
     */
    public deleteSocialMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const socialMedia = await this.service.deleteSocialMedia(req.params.id);
            if (!socialMedia) {
                return next(new HttpException(HttpCode.NOT_FOUND, `socialMedia ${HttpMessage.NOT_FOUND}`));
            }
            return res.json({
                message: "deleted"
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
    * Update   social media
    * @param req
    * @param res
    * @param next
    */
    public updateSocialMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (req.file) {
                const image = {
                    url: `http://localhost:8000/public/${req.file?.filename}`
                }
                req.body.image = image;
            }

            const socialMedia = await this.service.updateSocialMedia(req.body);
            if (!socialMedia) return next(new HttpException(HttpCode.NOT_FOUND, `socialMedia ${HttpMessage.NOT_FOUND}`));

            return res.send({
                message: "updated",
                socialMedia
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


}

export default SocialMediaController;
