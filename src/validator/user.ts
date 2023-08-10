import Joi, { number } from 'joi';
import { IUser } from '../interfaces/user.interface';


export const signupValidation = async (data: IUser) => {
    const userSchema = Joi.object().keys({
        first_name: Joi.string().min(3).max(40).required(),
        last_name: Joi.string().min(3).max(40).required(),
        company_name: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street_address: Joi.string().required(),
        postal_code: Joi.string().required(),
        email_address: Joi.string().email().trim().required(),
        phone_number: Joi.string().required(),
        password: Joi.string()
            .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long, and contain at least one uppercase letter, one digit, and one special character'
            })
    })

    return userSchema.validate(data)
}
export const loginValidation = async (data: any) => {
    const userSchema = Joi.object().keys({
        email_address: Joi.string().email().trim().required(),
        password: Joi.string()
            .required()
    })
    return userSchema.validate(data)
}


export const changePasswordValidation = async (data: IUser) => {
    const passSchema = Joi.object().keys({
        previousPassword: Joi.string()
            .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long, and contain at least one uppercase letter, one digit, and one special character'
            }),
            newPassword: Joi.string()
            .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long, and contain at least one uppercase letter, one digit, and one special character'
            })
    })

    return passSchema.validate(data)
}