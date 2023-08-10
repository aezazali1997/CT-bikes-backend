import Joi from 'joi';
export const AmazonSecretsValidator = async (data: any) => {
    const amazonSecretsSchema = Joi.object().keys({
        awsAccessKeyId: Joi.string().required(),
        awsSecretAccessKey: Joi.string().required(),
        awsRegion: Joi.string().optional(),
        sPApiRoleArn: Joi.string().required(),
        sPApiRoleSecret: Joi.string().required(),
        sPApiSellerId: Joi.string().required(),
        sPApiMarketplaceId: Joi.string().required()
    });

    return amazonSecretsSchema.validate(data)

}