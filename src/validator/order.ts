import Joi from 'joi';
enum Currency {
    AUD = 'AUD',
    BRL = 'BRL',
    CAD = 'CAD',
    CHF = 'CHF',
    CZK = 'CZK',
    DKK = 'DKK',
    EUR = 'EUR',
    GBP = 'GBP',
    HKD = 'HKD',
    HUF = 'HUF',
    ILS = 'ILS',
    INR = 'INR',
    JPY = 'JPY',
    MXN = 'MXN',
    MYR = 'MYR',
    NOK = 'NOK',
    NZD = 'NZD',
    PHP = 'PHP',
    PLN = 'PLN',
    SEK = 'SEK',
    SGD = 'SGD',
    THB = 'THB',
    TWD = 'TWD',
    USD = 'USD'
}
export const createOrder = async (data: any) => {
    const orderSchema = Joi.object().keys({
        first_name: Joi.string().min(3).max(40).required(),
        last_name: Joi.string().min(3).max(40).required(),
        company_name: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street_address: Joi.string().required(),
        postal_code: Joi.string().required(),
        email_address: Joi.string().email().trim().required(),
        phone_number: Joi.string().required(),
      //  items: Joi.array().required(),
        cartId:Joi.string().required(),
        order_notes: Joi.string().allow(""),
        // total_amount: Joi.number().required(),
        // shipping_fee: Joi.number().required(),
        // currency: Joi.string().valid(...Object.values(Currency)).required(),
    })

    return orderSchema.validate(data)
}

export const updateOrder = async (data: any) => {
    const userSchema = Joi.object().keys({
        first_name: Joi.string().allow(""),
        last_name: Joi.string().allow(""),
        company_name: Joi.string().allow(""),
        country: Joi.string().allow(""),
        city: Joi.string().allow(""),
        street_address: Joi.string().allow(""),
        postal_code: Joi.string().allow(""),
        email_address: Joi.string().allow(""),
        phone_number: Joi.string().allow(""),
        order_notes: Joi.string().allow(""),
        status: Joi.number().allow(""),
      

    })

    return userSchema.validate(data)
}

export const updateOrderAdmin = async (data: any) => {
    const userSchema = Joi.object().keys({
        first_name: Joi.string().allow(""),
        last_name: Joi.string().allow(""),
        company_name: Joi.string().allow(""),
        country: Joi.string().allow(""),
        city: Joi.string().allow(""),
        street_address: Joi.string().allow(""),
        postal_code: Joi.string().allow(""),
        email_address: Joi.string().allow(""),
        phone_number: Joi.string().allow(""),
        order_notes: Joi.string().allow(""),
        status: Joi.number().allow(""),
        items: Joi.array(),
        total_amount: Joi.number(),
        currency: Joi.string().valid(...Object.values(Currency)),
        isPaid:Joi.boolean()
    })

    return userSchema.validate(data)
}

// export const validateOrderAddress = async (data: any) => {
//     const addressSchema = Joi.object({
//         street_number: Joi.string().allow(""),
//         unit_number: Joi.string().allow(""),
//         address_line1: Joi.string().allow(""),
//         address_line2: Joi.string().allow(""),
//         order_notes: Joi.string().allow(""),
//         city: Joi.string().allow(""),
//         region: Joi.string().allow(""),
//         postal_code: Joi.string().allow(""),
//         country: Joi.string().allow(""),
//         county: Joi.string().allow(""),
//         is_default: Joi.boolean(),
//     })

//     return addressSchema.validate(data)
// }

// export const validateOrderUser = async (data: any) => {
//     const addressSchema = Joi.object({
//         name: Joi.string().allow(""),
//         email_address: Joi.string().allow(""),
//         phone_number: Joi.string().allow(""),
//         company_name: Joi.string().allow(""),
//     })

//     return addressSchema.validate(data)
// }