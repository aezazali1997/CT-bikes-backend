import { model, Schema, Document } from 'mongoose';
import { IComment } from '../interfaces/comment.interface';


const commentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
        },
        text: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true,
    },
);


const commentModel = model<IComment & Document>('Comment', commentSchema);
export default commentModel;