import { Document } from "mongoose";

export interface ISlider extends Document {
  text_one: string,
  text_two: string,
  image:{
    url:string
  }
}
