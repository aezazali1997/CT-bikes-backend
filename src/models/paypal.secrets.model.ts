import { Schema, model } from 'mongoose'

const PaypalSecretsSchema = new Schema({
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
    }
})
export const PayPalSecretsModel = model('PayPalSecret', PaypalSecretsSchema)