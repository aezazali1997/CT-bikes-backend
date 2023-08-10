import { model, Schema, Document } from 'mongoose';

const returnPolicySchema: Schema = new Schema(
    {
        text: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
returnPolicySchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};
const returnPolicyModel = model('returnPolicy', returnPolicySchema);
export default returnPolicyModel;