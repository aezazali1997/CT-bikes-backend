import mongoose, { model, Schema, Document } from 'mongoose';

const clickSchema: Schema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            default:null
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product',
            required:[true,"Product Id is Required"]
           
        },
        Ip: {
            type: String,
            default:null
        },
        clicked: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true,
    },
);



const clickModel = model('Click', clickSchema);
export default clickModel;