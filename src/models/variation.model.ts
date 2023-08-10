import mongoose, { model, Schema, Document } from 'mongoose';
export const variationSchema = new Schema({
    sku: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      required: true
    }
  });