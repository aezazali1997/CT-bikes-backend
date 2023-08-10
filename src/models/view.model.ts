import { model, Schema, Document } from 'mongoose';
import { IView } from '../interfaces/view.interface';


const viewSchema: Schema = new Schema(
    {
        device: {
            type: String,
            required: true,
            default: 'Desktop'
        }
    },
    {
        timestamps: true,
    },
);

const viewModel = model<IView>('View', viewSchema);
export default viewModel;