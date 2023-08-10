
import mongoose from 'mongoose';
import { model } from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Order',

    },
    paymentId: {
        type: String,
       
    },
    payment_method: {
        type: String,
       
    },
    payer_email: {
        type: String,
       
    },
    payer_firstName: {
        type: String,
       
    },
    payer_lastName: {
        type: String,
       
    },
    status: {
        type: String,
        enum: ['created', 'approved', 'failed', 'canceled'],
        default: 'created'
    },
    total_amount: {
        type: Number,
        
    },
    currency: {
        type: String,
        
    },
   

},
    {
        timestamps: true
    });

const paymentModel = model('Payment', PaymentSchema);
export default paymentModel;
