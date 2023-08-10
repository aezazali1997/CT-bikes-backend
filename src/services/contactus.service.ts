import contactusModel from '../models/contactus.model';


/**
 *
 *
 * @export
 * @class ContactusService
 */
export default class ContactusService {

    /**
     * Get Contactus 
     * @param 
     */
    public async getContactus() {
        let contactus = await contactusModel.findOne({});
        return contactus;


    }


    /**
    * Update Contactus
    * @param data
    */
    public async updateContactus(data:any) {
        let contactus = await contactusModel.findOne({});
      
        if (!contactus) return null;
        contactus.text = data.text || contactus.text;
        contactus.address = data.address || contactus.address;
        contactus.email = data.email || contactus.email;
        contactus.phone = data.phone || contactus.phone;
        contactus.friday = data.friday || contactus.friday;
        contactus.mondayToThursday = data.mondayToThursday || contactus.mondayToThursday;
        await contactus.save();
        return contactus;

    }


}