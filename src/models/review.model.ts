import mongoose, { model, Schema, Document } from 'mongoose';


const reviewSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true,

        },
        username: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true,
    },
);


// // Define a unique index on product_id and user_id to enforce
// // the one-review-per-product constraint
// //reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

// // Define a unique index on order_id and user_id to enforce
// // the one-review-per-order constraint
// reviewSchema.index({ order_id: 1, user_id: 1 }, { unique: true });

// const reviewModel = model<IReview>('Review', reviewSchema);
export default reviewSchema;