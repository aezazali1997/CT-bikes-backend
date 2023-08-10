import { PayPalSecretsModel } from '../models/paypal.secrets.model'

/**
 *
 *
 * @export
 * @class AmazonSecrets
 */
export default class PayPalSecretsService {

    /**
 * Get a Ebay Secret
 * @param data
 */
    public async get() {
        return await PayPalSecretsModel.find({})
    }

    /**
     * Create a new Amazon Secret
     * @param data
     */
    public async create(data: any) {

        let PayPalSecrets = await this.get()
        if (PayPalSecrets.length > 0) {
            throw new Error('Client already added')
        }
        let amazonSecret = await PayPalSecretsModel.findOne({
            clientId: data.clientId
        })
        if (amazonSecret) {
            throw new Error('Client already added')
        }
        return await PayPalSecretsModel.create(data);
    }



    /**
     * Delete a ebay Secret
     * @param data
     */
    public async delete(id: string) {
        await PayPalSecretsModel.findByIdAndDelete(id)
    }
}