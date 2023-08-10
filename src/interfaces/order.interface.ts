import { Document } from "mongoose";

export interface IOrder extends Document {
    _id?: string;
    user?: string;
    first_name: string;
    last_name: string;
    company_name: string;
    country: string;
    city: string;
    street_address: string;
    postal_code: string;
    email_address: string;
    phone_number: string;
    isPaid: boolean;
    items: any[];
    order_notes: string;
    subtotal: number;
    currency: string;
    status: string;
  }
  