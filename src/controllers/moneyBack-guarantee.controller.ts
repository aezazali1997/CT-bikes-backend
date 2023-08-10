import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import MoneybackGuaranteeService from '../services/moneyBack-guarantee.service';



class MoneybackGuaranteeController {
  service = new MoneybackGuaranteeService();


  /**
   * Get MoneybackGuarantee
   * @param req
   * @param res
   * @param next
   */
  public getMoneybackGuarantee = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const moneybackGuarantee = await this.service.getMoneybackGuarantee();
      if (!moneybackGuarantee) {
        return next(new HttpException(HttpCode.NOT_FOUND, `about ${HttpMessage.NOT_FOUND}`));
      }
      //const text = `<div>${MoneybackGuarantee.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
        moneybackGuarantee:moneybackGuarantee
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };



  /**
  * Update   MoneybackGuarantee
  * @param req
  * @param res
  * @param next
  */
  public updateMoneybackGuarantee = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const moneybackGuarantee = await this.service.updateMoneybackGuarantee(req.body.text);
      if (!moneybackGuarantee) return next(new HttpException(HttpCode.NOT_FOUND, `aboutus ${HttpMessage.NOT_FOUND}`));
     
      //const text = `<div>${aboutus.text.replace(/\n/g, "<br>")}</div>`;
     
      return res.send({
      moneybackGuarantee
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default MoneybackGuaranteeController;
