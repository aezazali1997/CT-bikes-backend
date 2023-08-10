import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import ReturnPolicyService from '../services/returnPolicy.service';



class ReturnPolicyController {
  service = new ReturnPolicyService();


  /**
   * Get  ReturnPolicy
   * @param req
   * @param res
   * @param next
   */
  public getReturnPolicy = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const returnPolicy = await this.service.getReturnPolicy();
      if (!returnPolicy) {
        return next(new HttpException(HttpCode.NOT_FOUND, `about ${HttpMessage.NOT_FOUND}`));
      }
      //const text = `<div>${returnPolicy.text.replace(/\n/g, "<br>")}</div>`;

      return res.send({
        returnPolicy
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
  * Update    ReturnPolicy
  * @param req
  * @param res
  * @param next
  */
  public updateReturnPolicy = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const returnPolicy = await this.service.updateReturnPolicy(req.body.text);
      if (!returnPolicy) return next(new HttpException(HttpCode.NOT_FOUND, `returnPolicy ${HttpMessage.NOT_FOUND}`));

      //const text = `<div>${returnPolicy.text.replace(/\n/g, "<br>")}</div>`;

      return res.send({
        returnPolicy
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


}

export default ReturnPolicyController;
