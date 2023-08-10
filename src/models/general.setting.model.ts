import { model, Schema, Document } from 'mongoose';

const generalSettingSchema: Schema = new Schema(
    {
        site_logo: {
            url: { type: String, }
        },

        favicon: {
            url: { type: String, }
        },
        site_title: {
            type: String,
        },
        site_url: {
            type: String,
        },
        site_name: {
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
generalSettingSchema.methods.toJSON = function () {
    const obj = this.toObject();
    // delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const generalSettingModel = model('generalSetting', generalSettingSchema);
export default generalSettingModel;