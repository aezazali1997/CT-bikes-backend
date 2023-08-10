import moneyBackGuaranteeModel from '../models/moneyBack-guarantee.model';



/**
 *
 *
 * @export
 * @class MoneybackGuaranteeService
 */
export default class MoneybackGuaranteeService {

    /**
     * Get MoneybackGuarantee 
     * @param 
     */
    public async getMoneybackGuarantee() {
        let moneyBackGuarantee = await moneyBackGuaranteeModel.findOne({});
        return moneyBackGuarantee;


    }


    /**
    * Update MoneybackGuarantee
    * @param data
    */
    public async updateMoneybackGuarantee(text:string) {
        let moneyBackGuarantee = await moneyBackGuaranteeModel.findOne({});
        
        if (!moneyBackGuarantee) return null;
        moneyBackGuarantee.text = text || moneyBackGuarantee.text;
        await moneyBackGuarantee.save();
        return moneyBackGuarantee;

    }


}