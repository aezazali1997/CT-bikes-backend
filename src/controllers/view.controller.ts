import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import ViewService from '../services/view.service';
import { IView } from '../interfaces/view.interface';


export class ViewController {
    service = new ViewService();


    /**
     * Create a view
     * @param req
     * @param res
     * @param next
     */
    public addView = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userAgentString = req.headers['user-agent'];
            let device = 0;
            if (userAgentString) {

                if (userAgentString.includes('Mobile')) {
                    device = 1;
                } else if (userAgentString.includes('Tablet')) {
                    device = 2
                } else {
                    device = 3
                }
                await this.service.addView(device)

            }
            res.status(HttpCode.OK).send('ok')
        } catch (error: any) {
            console.log('Erropr')
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    }
    /**
     * get all view
     * @param req
     * @param res
     * @param next
     */
    public getViews = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);

            const dailyViews = await this.service.view()
            res.status(HttpCode.OK).json({
                dailyViews
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}
