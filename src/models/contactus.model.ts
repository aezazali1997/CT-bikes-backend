import { model, Schema } from 'mongoose';
const contactusSchema: Schema = new Schema(
    {
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
                default: 'Point' // Set the type to 'Point' by default
            },
            coordinates: {
                type: [Number],
                required: true,
                default: []
            }
        },
        text: {
            type: String,
        },
        address: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        mondayToThursday: {
            openingTime: String,
            closingTime: String
        },
        friday: {
            morningOpeningTime: String,
            morningClosingTime: String,
            afternoonOpeningTime: String,
            afternoonClosingTime: String
        }
    },
    {
        timestamps: true,
    },
);


/**
  * Implement to JSON
  */
contactusSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.location;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};


const contactusModel = model('contactus', contactusSchema);
export default contactusModel;