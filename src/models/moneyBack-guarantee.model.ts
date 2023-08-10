import { model, Schema } from 'mongoose';
const moneyBackGuaranteeSchema: Schema = new Schema(
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
moneyBackGuaranteeSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const moneyBackGuaranteeModel = model('moneyBackGuarantee', moneyBackGuaranteeSchema);
export default moneyBackGuaranteeModel;