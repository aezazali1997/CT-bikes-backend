import mongoose, { model, Schema, Document } from 'mongoose';
import { Order } from '../types/order';

const orderSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true,
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        company_name: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street_address: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true

        },
        email_address: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        items: {
            type: [mongoose.Schema.Types.Mixed],
            required: true
          },
        order_notes: {
            type: String,
        },
        // cartId: {
        //     type: String,
        // },
        shipping_fee: {
            type: Number,
            default: 0
        },
        subtotal: {
            type: Number,
           default:0
        },
        discount: {
            type: Number,
        },
        total_items: {
            type: Number,
            default:0
        },
        paymentId: {
            type: String,
        },
        currency: {
            type: String,
            default:"GBP",
        }
        ,
        status: {
            type: String,
            enum: [Order.Not_processed, Order.Created, Order.Processing, Order.Shipped, Order.Delivered, Order.Cancelled],
            default: Order.Not_processed
        }
    },
    {
        timestamps: true,
    },
);

const orderModel = model('Order', orderSchema);
export default orderModel;
