import { HttpMessage } from '../exceptions/errorMessages';
import { IReview } from '../interfaces/review.interface';
import productModel from '../models/product.model';




/**
 *
 *
 * @export
 * @class ReviewService
 */
export default class ReviewService {

    /**
     * Create a new review
     * @param data
     */
    public async create(data: IReview) {

        const product = await productModel.findById({ _id: data.productId });
        if (!product) return null;

        // check if user already review
        const hasUserReviewed = product.reviews?.some((review: any) => review.userId.toString() === data.userId);
        if (hasUserReviewed) return HttpMessage.ALREADY_DONE;

        product.reviews.push(data);
        const averageRating = product.reviews.reduce((sum: any, review: any) =>
            sum + review.rating, 0) / product.reviews.length;
        const formattedAverageRating = averageRating.toFixed(1);
        product.average_rating = formattedAverageRating;

        await product.save()
        return product;

    }
    public searchReviews = async (query: any) => {
        const { name } = query
        const page = Number(query.pageNumber) || 1;
        const pageSize = Number(query.pageSize) || 10;


        let allProducts = await productModel.find({
            "reviews.username": {
                $regex: `${name}*`,
                $options: 'i'
            }
        })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        let newAllProducts = allProducts.map((product: any) => {
          let newProduct: any = {};
          newProduct.image = product.main_image.url;
          newProduct.title = product.title;
          product.reviews.forEach((review: any) => {
            newProduct.customer = review.username;
            newProduct.rating = review.rating;
            newProduct.date = review.createdAt;
          });
          return newProduct;
        });
        return newAllProducts;

    }
    /* Delete review  */
    public deleteReview = async (productId: string, reviewid: string) => {

        let doc = await productModel.findById(productId);
        let reviews = []

        if (!doc) {
            return
        }
        reviews = doc.reviews.filter((review: any) => review.id !== reviewid)
        let updated = await productModel.updateOne({ "_id": productId }, {
            $set: {
                reviews
            }
        })

    }
}