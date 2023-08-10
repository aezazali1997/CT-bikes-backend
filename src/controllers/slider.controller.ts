import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import SliderService from '../services/slider.service';



class SliderController {
    service = new SliderService();


    /**
    * Create slider
    * @param req
    * @param res
    * @param next
    */
    public createSlider = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (!req.file) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: HttpMessage.NO_FILE_CHOSEN });
            }

            const image = {
                url: `http://localhost:8000/slider/${req.file.filename}`
            }
            req.body.image = image;
            // res.status(HttpCode.OK).json({
            //     message: 'File uploaded successfully!',
            //     image: {
            //         url: `http://localhost:8000/images/${req.file.filename}`
            //     }
            // });
            const slider = await this.service.createSlider(req.body);
            // if (slider == HttpMessage.CONFLICT) {
            //     return next(new HttpException(HttpCode.CONFLICT, `slider ${HttpMessage.CONFLICT}`));
            // }
            return res.status(201).send({
                message: "created",
                slider: slider
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
     * Get Slider
     * @param req
     * @param res
     * @param next
     */
    public getSlider = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const slider = await this.service.getSlider(req.params.id);
            if (!slider) {
                return next(new HttpException(HttpCode.NOT_FOUND, `slider ${HttpMessage.NOT_FOUND}`));
            }

            return res.send({
                slider
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
     * Get All Sliders
     * @param req
     * @param res
     * @param next
     */
    public getAllsliders = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const sliders = await this.service.getAllslider(req.query);
            return res.json({
                sliders
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
     * Delete Slider
     * @param req
     * @param res
     * @param next
     */
    public deleteSlider = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            const slider = await this.service.deleteSlider(req.params.id);
            if (!slider) {
                return next(new HttpException(HttpCode.NOT_FOUND, `slider ${HttpMessage.NOT_FOUND}`));
            }
            return res.json({
                message: "deleted"
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
    * Update   slider
    * @param req
    * @param res
    * @param next
    */
    public updateSlider = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            if (req.file) {
                const image = {
                    url: `http://localhost:8000/slider/${req.file.filename}`
                }
                req.body.image = image;
            }


            const slider = await this.service.updateSlider(req.body);
            if (!slider) return next(new HttpException(HttpCode.NOT_FOUND, `slider ${HttpMessage.NOT_FOUND}`));

            return res.send({
                message: "updated",
                slider
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


}

export default SliderController;
