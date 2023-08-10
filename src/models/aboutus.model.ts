import { model, Schema } from 'mongoose';
import { IAboutUs } from '../interfaces/aboutus.interface';


const aboutusSchema: Schema = new Schema(
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
aboutusSchema.methods.toJSON = function () {
    const obj: IAboutUs = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const aboutusModel = model<IAboutUs>('aboutus', aboutusSchema);
export default aboutusModel;