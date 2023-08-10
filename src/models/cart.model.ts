import mongoose, { model, Schema, Document } from 'mongoose';


const cartSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true,
        },
        items: [
            {
                _id: false,
                productId: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'Product',
                    required: true
                },
                quantity_in_stock: { type: Number },
                item_subtotal: { type: Number },
                title: { type: String, required: true },
                price: { type: Number, required: true },
                main_image: {
                    url: { type: String, required: true }
                },
                quantity: {
                    type: Number,
                    default: 1,
                },

            },
        ],
        total_items: {
            type: Number,
            default: 0
        },
        coupons: [
            {
                _id:false,
                code: {
                    type: String
                },
                discount: {
                    type: Number
                },
                name: {
                    type: String
                }
            }
        ],
        discount: {
            type: Number,
            default:0
        },
        subtotal: {
            type: Number,
            default: 0

        }

    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
cartSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};

const cartModel = model('Cart', cartSchema);
export default cartModel;