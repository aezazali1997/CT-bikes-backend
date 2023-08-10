import { Schema, Types, model } from 'mongoose'
import { INotificaton } from '../interfaces/notification.interface';

// Define the Notification schema
const notificationSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: Types.ObjectId,
        ref: 'User', // Assuming there is a User model to reference
        required: true
    },
    readStatus: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create the Notification model
const userModel = model<INotificaton>('Notification', notificationSchema);

export default userModel;
