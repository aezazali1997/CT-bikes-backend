import { Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    brand: string;
    parent_category: string,
    category: string,
    price: number;
    comparePrice: number;
    quantity: number;
    quantity_in_stock: number;
    sku: number;
    images: string[];
    main_image: string;
    [key: string]: any;
    clicked: number;
    slug?: string;

}