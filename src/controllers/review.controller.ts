import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import ReviewService from '../services/review.service';
import { createReview, updateReview } from '../validator/review';
import ProductService from '../services/product.service'

class ReviewController {
    service = new ReviewService();
    productService = new ProductService()

    /**
     * Create a new review
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

            const { error } = await createReview(req.body);
            if (error) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
            }

            req.body.userId = req.user?.id;
            req.body.username = req.user.first_name + " " + req.user.last_name
            const review = await this.service.create(req.body);
            if (!review) return res.status(404).json({ message: 'Product Not Found' });
            if (review == HttpMessage.ALREADY_DONE) return res.status(400).json({ message: 'Already Reviewed' });

            return res.json({
                message: `${HttpMessage.CREATED}`
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };

    /**
  * Create a new review
  * @param req
  * @param res
  * @param next
  */
    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            let allProducts = await this.productService.getAllProductReviews(req.query)
            let newAllProducts = allProducts.map((product) => {
                let newProduct: any = {};
                newProduct.productId = product.id
                newProduct.image = product.main_image.url
                newProduct.title = product.title
                product.reviews.forEach((review: any) => {
                    newProduct.reviewId = review.id
                    newProduct.customer = review.username
                    newProduct.rating = review.rating
                    newProduct.date = review.createdAt
                })
                return newProduct

            })
            return res.status(HttpCode.OK).json({
                newAllProducts
            })
        }
        catch (err: any) {
            res.status(500).json({ message: err.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }

    };

    /* Search for some reviews */
    search = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { query } = req;

            if (!query) {
                return res.status(HttpCode.BAD_REQUEST).json({
                    message: 'Query parameter is required.',
                });
            }

            const reviews = await this.service.searchReviews(query);

            return res.status(HttpCode.OK).json({
                reviews,
            });

        } catch (error: any) {
            res.status(500).json({
                message: error.message || HttpMessage.INTERNAL_SERVER_ERROR
            })
        }
    }
    /* Delete a review */
    delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { productId, reviewId } = req.body;
        try {
            if (!productId || !reviewId) {
                return res.status(HttpCode.BAD_REQUEST).json({
                    message: 'product Id && its review id is required.',
                });
            }
            await this.service.deleteReview(productId as string, reviewId as string)

            res.status(HttpCode.OK).send(HttpMessage.SUCCESS)


        } catch (error: any) {
            res.status(500).json({
                message: error.message || HttpMessage.INTERNAL_SERVER_ERROR
            })

        }
    }






}

export default ReviewController;
