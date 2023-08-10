import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import AboutusService from '../services/aboutus.service';



class AboutusController {
  service = new AboutusService();


  /**
   * Get a aboutus
   * @param req
   * @param res
   * @param next
   */
  public getAboutus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const aboutus = await this.service.getAboutus();
      if (!aboutus) {
        return next(new HttpException(HttpCode.NOT_FOUND, `about ${HttpMessage.NOT_FOUND}`));
      }
      //const text = `<div>${aboutus.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
     //  image: aboutus.image,
      //  text,
      aboutus
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };



  /**
  * Update   updateAboutus
  * @param req
  * @param res
  * @param next
  */
  public updateAboutus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (req.body.image) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(req.body.image.url)) {
          return next(new HttpException(HttpCode.BAD_REQUEST, `Invalid url format!...`));
        }

      }
      const aboutus = await this.service.updateAboutus(req.body);
      if (!aboutus) return next(new HttpException(HttpCode.NOT_FOUND, `aboutus ${HttpMessage.NOT_FOUND}`));
     
      //const text = `<div>${aboutus.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
       // message: "aboutus",
      // image: aboutus.image,
      //  text,
      aboutus
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default AboutusController;
