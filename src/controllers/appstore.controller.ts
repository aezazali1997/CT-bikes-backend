import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import AppstoreService from '../services/appstore.service';


class AppstoreController {
  service = new AppstoreService();


  /**
   * Get a appstore
   * @param req
   * @param res
   * @param next
   */
  public getAppstore = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const appstore = await this.service.getAppstore();
      if (!appstore) {
        return next(new HttpException(HttpCode.NOT_FOUND, `appstore ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "appstore",
        appstore: appstore,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };



  /**
  * Update a  updateAppstore
  * @param req
  * @param res
  * @param next
  */
  public updateAppstore = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (req.file) {
        const image = {
          url: `http://localhost:8000/public/${req.file.filename}`
        }
        req.body.image = image;
      }

      const appstore = await this.service.updateAppstore(req.body);
      if (!appstore) return next(new HttpException(HttpCode.NOT_FOUND, `appstore ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "updated",
        appstore: appstore,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default AppstoreController;
