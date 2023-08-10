import mongoose, { model, Schema } from 'mongoose';

const couponSchema: Schema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        expirationTime: {
            type: Date, //YYYY-MM-DD
        },
        discount: {
            type: Number,
            required: true,

        }, usersUsed: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        status: {
            type: Boolean,
            default: false,
        }

    },
    {
        timestamps: true,
    },
);



const couponModel = model('Coupon', couponSchema);
export default couponModel;