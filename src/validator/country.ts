import Joi from 'joi';
export const createCountry = async (data: any) => {
    const countrySchema = Joi.object().keys({
        name: Joi.string().min(1).max(40).required(),
        disabled: Joi.bool(),
        states:Joi.array(),
        shipping_fee:Joi.number()
    });

    return countrySchema.validate(data)

}