import { model, Schema } from 'mongoose';
const safeShoppingSchema: Schema = new Schema(
    {
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
safeShoppingSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const safeShoppingModel = model('safeShopping', safeShoppingSchema);
export default safeShoppingModel;