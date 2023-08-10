import { Document } from "mongoose";
export interface IAboutUs extends Document {
    images: [
        {
            url: string;
        }
    ],
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
