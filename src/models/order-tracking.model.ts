import { model, Schema } from 'mongoose';
import { IOrderTracking } from '../interfaces/orderTracking.interface';



const orderTrackingSchema: Schema = new Schema(
    {
        images: [{
            url: {
                type: String,
            }
        }],
        text: {
            type: String,
        }

    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
orderTrackingSchema.methods.toJSON = function () {
    const obj: IOrderTracking = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const orderTrackingModel = model<IOrderTracking>('Ordertracking', orderTrackingSchema);
export default orderTrackingModel;