import { AmazonSecretsModel } from '../models/amazonsecrets.model'

/**
 *
 *
 * @export
 * @class AmazonSecrets
 */
export default class AmazonSecretsService {

    /**
 * Get a Ebay Secret
 * @param data
 */
    public async get() {
        return await AmazonSecretsModel.find({})
    }

    /**
     * Create a new Amazon Secret
     * @param data
     */
    public async create(data: any) {

        let Amazonsecrets = await this.get()
        if (Amazonsecrets.length > 0) {
            throw new Error('Client already added')
        }
        let amazonSecret = await AmazonSecretsModel.findOne({
            clientId: data.clientId
        })
        if (amazonSecret) {
            throw new Error('Client already added')
        }
        return await AmazonSecretsModel.create(data);
    }



    /**
     * Delete a ebay Secret
     * @param data
     */
    public async delete(id: string) {
        await AmazonSecretsModel.findByIdAndDelete(id)
    }
}