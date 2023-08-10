import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/category.service';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import { createCatagory } from '../validator/category';



class CatagoryController {
  service = new CategoryService();


  /**
   * Create a new category
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

      const { error } = await createCatagory(req.body);
      if (error) {
        return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
      }

      const category = await this.service.create(req.body);
      if (!category) {
        return next(new HttpException(HttpCode.CONFLICT, `category ${HttpMessage.CONFLICT}`));
      }
      return res.json({
        message: `${HttpMessage.CREATED}`,
        category: category,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };


  /**
   * Get all categories
   * @param req
   * @param res
   * @param next
   */
  public getallCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const categories = await this.service.getallCategories();
      return res.json({
        message: "all categories",
        categories: categories,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };


  /**
   * Get a category
   * @param req
   * @param res
   * @param next
   */
  public getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const category = await this.service.getCategory(req.params.id);
      if (!category) {
        return next(new HttpException(HttpCode.NOT_FOUND, `category ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "category",
        category: category,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };


  /**
   * Delete a category
   * @param req
   * @param res
   * @param next
   */
  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const category = await this.service.deleteCategory(req.params.id);
      if (!category) {
        return next(new HttpException(HttpCode.NOT_FOUND, `category ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "category deleted",
        category: category,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };

  /**
  * Update new category
  * @param req
  * @param res
  * @param next
  */
  public updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const category = await this.service.updateCategory(req.body);
      if (!category) return next(new HttpException(HttpCode.NOT_FOUND, `category ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "updated",
        category: category,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };


}

export default CatagoryController;
