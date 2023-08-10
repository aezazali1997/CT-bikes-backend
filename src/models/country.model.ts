import { model, Schema, Document } from 'mongoose';
import { ICountry } from '../interfaces/country.interface';

const countrySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        states: {
            type: [String],
        },
        shipping_fee: {
            type: Number,
            default: 20
        },
        disabled: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
    },
);

/**
  * Implement to JSON
  */
countrySchema.methods.toJSON = function () {
    const obj: any = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const countryModel = model<ICountry & Document>('Country', countrySchema);
export default countryModel;