import Joi from 'joi';
export const EbaySecretsValidator = async (data: any) => {
    const ebaySecretsSchema = Joi.object().keys({
        clientId: Joi.string().required(),
        clientSecret: Joi.string().required(),
        env: Joi.string().optional(),
        scope: Joi.string().required(),
        redirectURI: Joi.string().required()
    });

    return ebaySecretsSchema.validate(data)

}