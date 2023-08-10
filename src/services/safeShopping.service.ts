
import safeShoppingModel from '../models/safe-shopping.model';



/**
 *
 *
 * @export
 * @class safeShoppingService
 */
export default class safeShoppingService {

    /**
     * Get safeShopping
     * @param 
     */
    public async getSafeShopping() {
        let safeShopping = await safeShoppingModel.findOne({});
        return safeShopping;

    }


    /**
    * Update safeShopping
    * @param data
    */
    public async updateSafeShopping(text: string) {
        let safeShopping = await safeShoppingModel.findOne({});

        if (!safeShopping) return null;
        safeShopping.text = text || safeShopping.text;
        await safeShopping.save();
        return safeShopping;

    }


}