import { Document } from "mongoose";

export interface IAppstore extends Document {
  address: string,
  email: string,
  phone: string,
  image:{
    url:string
  },
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
