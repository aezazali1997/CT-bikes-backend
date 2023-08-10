import { model, Schema } from 'mongoose';
import { ISocialMedia } from '../interfaces/socialmedia.interface';


const socialMediaSchema: Schema = new Schema(
    {
        image: {
            url: {
                type: String,
            }
        },
        name: {
            type: String,
            required:true,
            unique:true
        },
        url: {
            type: String,
            required:true
        }

    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
socialMediaSchema.methods.toJSON = function () {
    const obj: ISocialMedia = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const socialMediaModel = model<ISocialMedia>('socialmedia', socialMediaSchema);
export default socialMediaModel;