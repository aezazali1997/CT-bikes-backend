import Joi from 'joi';
import { IReview } from '../interfaces/review.interface';
export const createReview = async (data: IReview) => {
    const reviewSchema = Joi.object().keys({
        productId: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    });

    return reviewSchema.validate(data)

}

export const updateReview = async (data: IReview) => {
    const reviewSchema = Joi.object().keys({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().allow("")
    });

    return reviewSchema.validate(data)

}