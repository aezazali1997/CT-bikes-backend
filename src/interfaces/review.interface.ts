import { Document } from "mongoose";

export interface IReview extends Document {
    userId: string;
    productId:string;
    rating: number,
    comment: string,

}