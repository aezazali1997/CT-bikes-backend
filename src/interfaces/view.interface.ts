import { Document } from "mongoose";

export interface IView extends Document {
    device: string

}