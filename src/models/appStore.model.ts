import { model, Schema, Document } from 'mongoose';
import { IAppstore } from '../interfaces/appstore.interface';


const appstoreSchema: Schema = new Schema(
    {
        address: {
            type: String,
            default:"Unit 15, Osborne Mill Waddington Street Oldham Greater Manchester OL9 6QH"
        },
        email: {
            type: String,
            default:"jammycycles@yahoo.co.uk"
        },
        image: {
            url: {
                type: String,
            }
        },
        phone:{
            type:String,
            default:"0161 652 3258"
        }

    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
appstoreSchema.methods.toJSON = function () {
    const obj: IAppstore = this.toObject();
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const appstoreModel = model<IAppstore>('appStore', appstoreSchema);
export default appstoreModel;