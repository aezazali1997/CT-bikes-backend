import appstoreModel from '../models/appStore.model';
import { IAppstore } from '../interfaces/appstore.interface';
import path from 'path';
import fs from 'fs';
import { publicDir } from '../config/storage';



/**
 *
 *
 * @export
 * @class AppstoreService
 */
export default class AppstoreService {

    /**
     * Get Appstore 
     * @param 
     */
    public async getAppstore() {
        let appstore = await appstoreModel.findOne({});
        return appstore;


    }


    /**
    * Update Appstore
    * @param data
    */
    public async updateAppstore(data: IAppstore) {
        let appstore = await appstoreModel.findOne({});
        const { address, email, phone, image } = data;
        if (!appstore) return null;

        // if data image we will delete old image and set new
        if (image) {
            const fileName = path.basename(appstore.image.url);
            const imagePath = path.join(publicDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${appstore?.image.url} deleted`);
                }
            });
            appstore.image = image;
        }
        
        appstore.address = address || appstore.address;
        appstore.phone = phone || appstore.phone;
        appstore.email = email || appstore.email;
       
        await appstore.save();
        return appstore;

    }


}