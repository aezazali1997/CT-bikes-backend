import returnPolicyModel from '../models/return-policy.model';



/**
 *
 *
 * @export
 * @class Return Policy Service
 */
export default class ReturnPolicyService {

    /**
     * Get ReturnPolicy 
     * @param 
     */
    public async getReturnPolicy() {
        let returnPolicy = await returnPolicyModel.findOne({});
        return returnPolicy;


    }


    /**
    * Update ReturnPolicy
    * @param data
    */
    public async updateReturnPolicy(text: string) {
        let returnPolicy = await returnPolicyModel.findOne({});
        if (!returnPolicy) return null;
       

        returnPolicy.text = text || returnPolicy.text;
      
        await returnPolicy.save();
        return returnPolicy;

    }


}