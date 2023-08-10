import userModel from '../models/user.model';
import { UserRole } from './../types/user';
import {
    FIRST_NAME,
    LAST_NAME,
    COMPANY_NAME,
    COUNTRY,
    CITY,
    STREET_ADDRESS,
    POSTAL_CODE,
    EMAIL,
    PHONE_NUMBER,
    PASSWORD,
} from '../config/index';


export async function initAdmin() {
    const adminData = {
        first_name: FIRST_NAME,
        last_name: LAST_NAME,
        company_name: COMPANY_NAME,
        country: COUNTRY,
        city: CITY,
        street_address: STREET_ADDRESS,
        postal_code: POSTAL_CODE,
        email_address: EMAIL,
        phone_number: PHONE_NUMBER,
        role: UserRole.Admin,
        password: PASSWORD
    };

    try {
        const existing = await userModel.findOne({
            email_address: adminData.email_address,
            phone_number: adminData.phone_number,
        });

        if (!existing) {
            await userModel.deleteMany({ role: UserRole.Admin });
            await userModel.create(adminData);
        }
    } catch (err) {
        console.log("Error while seed  admin")
     }
}