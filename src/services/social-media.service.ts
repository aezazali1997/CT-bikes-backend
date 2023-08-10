import path from 'path';
import { filesDir, publicDir } from '../config/storage';
import fs from 'fs';
import socialMediaModel from '../models/socialmedia-icon.model';
import { ISocialMedia } from '../interfaces/socialmedia.interface';
import { HttpMessage } from '../exceptions/errorMessages';



/**
 *
 *
 * @export
 * @class SocialMediaService
 */
export default class SocialMediaService {

    /**
     * Create socialMedia 
     * @param 
     */
    public async createSocialMedia(data: ISocialMedia) {
        let socialMedia = await socialMediaModel.findOne({ name: data.name });
        if (socialMedia) {
            return HttpMessage.CONFLICT
        }

        socialMedia = await socialMediaModel.create(data);
        return socialMedia;
    }


    /**
     * Get socialMedia 
     * @param 
     */
    public async getSocialMedia(id: string) {
        const socialMedia = await socialMediaModel.findOne({ _id: id });
        return socialMedia;
    }


    /**
     * Delete socialMedia 
     * @param 
     */
    public async deleteSocialMedia(id: string) {
        const socialMedia: ISocialMedia | null = await socialMediaModel.findByIdAndDelete({ _id: id });

        // after deleting we will remove image too
        if (socialMedia) {
            const fileName = path.basename(socialMedia.image?.url);
            const imagePath = path.join(publicDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${socialMedia.image?.url} deleted`);
                }
            });
        }
        return socialMedia;
    }


    /**
     * Get All socialMedia 
     * @param 
     */
    public async getAllsocialMedia(query?: any) {
        const page = Number(query?.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query?.pageSize) || 30; // the total number of entries on a single page
        const socialMedia = await socialMediaModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        return socialMedia;
    }


    /**
    * Update SocialMedia
    * @param data
    */
    public async updateSocialMedia(data: ISocialMedia) {
        let socialMedia: ISocialMedia | null = await socialMediaModel.findOne({_id:data.id});
        if (!socialMedia) return null;

        // if data image we will delete old image and set new
        if (data.image) {
            const fileName = path.basename(socialMedia?.image.url);
            const imagePath = path.join(publicDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${socialMedia?.image.url} deleted`);
                }
            });
        }


        socialMedia.name = data.name || socialMedia.name;
        socialMedia.image = data.image || socialMedia.image;
        socialMedia.url = data.url || socialMedia.url;
        await socialMedia.save();
        return socialMedia;

    }


}