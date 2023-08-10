import { Schema, model } from 'mongoose'

const EbaySecretsSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    env: {
        type: String,
        optional: true,
        default: 'SANDBOX'
    },
    scope: {
        type: String,
        required: true
    },
    redirectURI: {
        type: String,
        required: true
    }
})
export const EbaySecretsModel = model('EbaySecret', EbaySecretsSchema)