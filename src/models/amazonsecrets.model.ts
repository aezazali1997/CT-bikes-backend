import { Schema, model } from 'mongoose'

const AmazonSecretsSchema = new Schema({
    awsAccessKeyId: {
        type: String,
        required: true
    },
    awsSecretAccessKey: {
        type: String,
        required: true
    },
    awsRegion: {
        type: String,
        required: true,
    },
    sPApiRoleArn: {
        type: String,
        required: true
    },
    sPApiRoleSecret: {
        type: String,
        required: true
    },
    sPApiSellerId: {
        type: String,
        required: true
    },
    sPApiMarketplaceId: {
        type: String,
        required: true
    }
})
export const AmazonSecretsModel = model('AmazonSecret', AmazonSecretsSchema)