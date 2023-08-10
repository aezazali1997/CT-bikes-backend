import { EbaySecretsModel } from '../models/ebaysecrets.model'

/**
 *
 *
 * @export
 * @class EbaySecret
 */
export default class EbaySecretsService {

    /**
 * Get a Ebay Secret
 * @param data
 */
    public async get() {
        return await EbaySecretsModel.find({})
    }

    /**
     * Create a new Ebay Secret
     * @param data
     */
    public async create(data: any) {

        let Ebaysecrets = await this.get()
        if (Ebaysecrets.length > 0) {
            throw new Error('Client already added')
        }
        let ebaySecret = await EbaySecretsModel.findOne({
            clientId: data.clientId
        })
        if (ebaySecret) {
            throw new Error('Client already added')
        }
        return await EbaySecretsModel.create(data);
    }



    /**
     * Delete a ebay Secret
     * @param data
     */
    public async delete(id: string) {
        await EbaySecretsModel.findByIdAndDelete(id)
    }
}