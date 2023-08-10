import { Document } from "mongoose";
export interface ISocialMedia extends Document {
    image: {
        url: string;
    }
    ,
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
