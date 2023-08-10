import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import ContactusService from '../services/contactus.service';



class ContactusController {
  service = new ContactusService();


  /**
   * Get Contactus
   * @param req
   * @param res
   * @param next
   */
  public getContactus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const contactus = await this.service.getContactus();
      if (!contactus) {
        return next(new HttpException(HttpCode.NOT_FOUND, `contactus ${HttpMessage.NOT_FOUND}`));
      }
      //const text = `<div>${contactus.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
        contactus:contactus
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };



  /**
  * Update   Contactus
  * @param req
  * @param res
  * @param next
  */
  public updateContactus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const contactus = await this.service.updateContactus(req.body);
      if (!contactus) return next(new HttpException(HttpCode.NOT_FOUND, `contactus ${HttpMessage.NOT_FOUND}`));
     
      //const text = `<div>${aboutus.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
      contactus
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default ContactusController;
