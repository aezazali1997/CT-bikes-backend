import mongoose, { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
import reviewSchema from './review.model';
import { variationSchema } from './variation.model';

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
}, {
    _id: false
});

const productSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        brand: {
            type: String
        },
        parent_category: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Category',
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        comparePrice: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        quantity_in_stock: {
            type: Number,
            default: 0
        },
        images: {
            type: [imageSchema],
            required: true,
        },
        main_image: {
            type: imageSchema,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false
        },
        top_rated: {
            type: Boolean,
            default: false
        },
        best_sellor: {
            type: Boolean,
            default: false
        },
        popular: {
            type: Boolean,
            default: false
        },
        reviews: [reviewSchema],
        average_rating: {
            type: Number,
            default: 0
        },
        variations: {
            type: [variationSchema],
            default: null
        },

        // seo related stuff

        meta_title: {
            type: String
        },
        meta_description: {
            type: String
        },
        keywords: {
            type: [String]
        },
        tags: {
            type: [String],
            default: []
        },
        canonical_url: {
            type: String
        }


    },
    {
        timestamps: true,
    },
);

/**
  * Implement to JSON
  */
productSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


// Create a compound text index on title, description, keywords, and tags fields
productSchema.index({ title: 'text', description: 'text', keywords: 'text', tags: 'text' });

const productModel = model<IProduct>('Product', productSchema);
export default productModel;