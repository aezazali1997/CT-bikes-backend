import aboutusModel from '../models/aboutus.model';
import { IAboutUs } from '../interfaces/aboutus.interface';
import path from 'path';
import { filesDir } from '../config/storage';
import fs from 'fs';



/**
 *
 *
 * @export
 * @class AboutusService
 */
export default class AboutusService {

    /**
     * Get Aboutus 
     * @param 
     */
    public async getAboutus() {
        let aboutus = await aboutusModel.findOne({});
        return aboutus;


    }


    /**
    * Update Aboutus
    * @param data
    */
    public async updateAboutus(data: any) {
        const { imageToRemove, newImage, text } = data;
        let aboutus: any = await aboutusModel.findOne({});
        if (!aboutus) return null;

        // if data image we will delete old image and set new
        if (imageToRemove) {
            const fileName = path.basename(imageToRemove.url);
            const imagePath = path.join(filesDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${imageToRemove.url} deleted`);
                }
            });

            // Filter out the image with the specified URL
            const filteredImages = aboutus.images.filter((image: any) => image.url !== imageToRemove.url);

            // Assign the filtered array back to aboutus.images
            aboutus.images = filteredImages;

            await aboutus.save();
            return aboutus;
        }

        if (newImage) {

            aboutus.images.push(newImage);
            await aboutus.save();
            return aboutus;
        }



        aboutus.text = text || aboutus.text;
        await aboutus.save();
        return aboutus;

    }


}