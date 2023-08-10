import { model, Schema } from 'mongoose';

const sliderSchema: Schema = new Schema(
    {
        image: {
            url: {
                type: String,
                required:true
            }
        },
        text_one: {
            type: String,
        },
        text_two: {
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
sliderSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const sliderModel = model('slider', sliderSchema);
export default sliderModel;