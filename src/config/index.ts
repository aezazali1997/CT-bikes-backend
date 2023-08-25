import { config } from 'dotenv';
config();
export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_URI,
    ORIGIN,
    API_BASE_PATH,
    JWT_SECRET_KEY,

    // admin
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

    //mail
    JWT_FORGET_PASSWORD,
    MAIL_FROM,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_SECURE,
    MAIL_USER,
    MAIL_PASSWORD,

    // paypal
    PAYMENT_MODE,
    CLIENT_ID,
    CLIENT_SECRET

} = process.env;