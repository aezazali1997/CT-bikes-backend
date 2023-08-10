import Joi from 'joi';
export const PayPalSecretsValidator = async (data: any) => {
    const PayPalSecretsSchema = Joi.object().keys({
        clientId: Joi.string().required(),
        clientSecret: Joi.string().required(),
        env: Joi.string().optional(),
    });

    return PayPalSecretsSchema.validate(data)

}