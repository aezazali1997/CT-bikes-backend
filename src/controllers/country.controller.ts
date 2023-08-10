import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import CountryService from '../services/country.service';
import { createCountry } from '../validator/country';
import mongoose from 'mongoose';


class CountryController {
  service = new CountryService();


  /**
   * Create a new country
   * @param req
   * @param res
   * @param next
   */
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { error } = await createCountry(req.body);
      if (error) {
        return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
      }

      const country = await this.service.create(req.body);
      if (!country) {
        return next(new HttpException(HttpCode.CONFLICT, `country ${HttpMessage.CONFLICT}`));
      }
      return res.json({
        message: `${HttpMessage.CREATED}`,
        country: country,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


  /**
   * Get all countries
   * @param req
   * @param res
   * @param next
   */
  public getallCountries = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const countries = await this.service.getallCountries();
      return res.json({
        message: "all countries",
        countries: countries,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


  /**
   * Get a country
   * @param req
   * @param res
   * @param next
   */
  public getCountry = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
     
      let  country = await this.service.getCountry(req.params.identifier);
      if (!country) {
        return next(new HttpException(HttpCode.NOT_FOUND, `country ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "country",
        country: country,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


  /**
   * Delete a country
   * @param req
   * @param res
   * @param next
   */
  public deleteCountry = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const country = await this.service.deleteCountry(req.params.id);
      if (!country) {
        return next(new HttpException(HttpCode.NOT_FOUND, `country ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "country deleted",
        country: country,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };

  /**
  * Update a  country
  * @param req
  * @param res
  * @param next
  */
  public updateCountry = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const country = await this.service.updateCountry(req.body);
      if (!country) return next(new HttpException(HttpCode.NOT_FOUND, `country ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "updated",
        country: country,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
      // next(error);
    }
  };


}

export default CountryController;
