import path from 'path';
import { publicDir } from '../config/storage';
import fs from 'fs';
import orderTrackingModel from '../models/order-tracking.model';



/**
 *
 *
 * @export
 * @class OrderTackingService
 */
export default class OrderTrackingService {

    /**
     * Get OrderTacking 
     * @param 
     */
    public async getOrderTracking() {
        let orderTracking = await orderTrackingModel.findOne({});
        return orderTracking;
    }


    /**
    * Update OrderTacking
    * @param data
    */
    public async updateOrderTracking(data: any) {
        const {  images, text } = data;
        let orderTracking: any = await orderTrackingModel.findOne({});
        if (!orderTracking) return null;

        // if data image we will delete old image and set new
        if (images.length>0) {
            for(let i of orderTracking.images){
            const fileName = path.basename(i.url);
            const imagePath = path.join(publicDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${i.url} deleted`);
                }
            });
        }
        
        orderTracking.images= images;
        }
        orderTracking.text = text || orderTracking.text;
        await orderTracking.save();
        return orderTracking;

    }


}