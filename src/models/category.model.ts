import { model, Schema,Document } from 'mongoose';
import { Category } from '../interfaces/category.interface';


const categorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },

    },
    {
        timestamps: true,
    },
);



const categoryModel = model<Category & Document>('Category', categorySchema);
export default categoryModel;