import { Document } from "mongoose";
import { UserRole } from '../types/user';


export interface IUser extends Document {
    first_name: string;
    last_name: string;
    company_name: string,
    country: string,
    city: string,
    street_address: string,
    postal_code: string,
    email_address: string;
    phone_number: string,
    password: string,
    password_token: string,
    role: UserRole,
    matchPassword: (pw: string) => Promise<boolean>



}