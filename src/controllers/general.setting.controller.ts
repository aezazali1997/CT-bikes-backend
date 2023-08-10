import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import AppstoreService from '../services/appstore.service';
import GeneralSettingService from '../services/general.setting.service';
import SocialMediaService from '../services/social-media.service';


class GeneralSettingController {
  service = new GeneralSettingService();


  /**
   * Get 
   * @param req
   * @param res
   * @param next
   */
  public getGeneralSetting = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const generalSetting = await this.service.getGeneralSetting();
      const appStore = await new AppstoreService().getAppstore();
      const socialMedia = await new SocialMediaService().getAllsocialMedia();
    //   if (!generalSetting) {
    //     return next(new HttpException(HttpCode.NOT_FOUND, `generalSetting ${HttpMessage.NOT_FOUND}`));
    //   }
      return res.json({
        message: "generalSetting",
        generalSetting: generalSetting,
        appStore: appStore,
        socialMedia: socialMedia,
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
  public updateGeneralSetting = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const generalSetting = await this.service.updateGeneralSetting(req.body);
      if (!generalSetting) return next(new HttpException(HttpCode.NOT_FOUND, `generalSetting ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "updated",
        generalSetting: generalSetting,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default GeneralSettingController;
