import generalSettingModel from '../models/general.setting.model';



/**
 *
 *
 * @export
 * @class GeneralSettingService
 */
export default class GeneralSettingService {

    /**
     * Get GeneralSetting 
     * @param 
     */
    public async getGeneralSetting() {
        let generalSetting = await generalSettingModel.findOne({});
        return generalSetting;


    }


    /**
    * Update GeneralSetting
    * @param data
    */
    public async updateGeneralSetting(data: any) {
        let generalSetting = await generalSettingModel.findOne({});
        if (!generalSetting) return null;

        const { site_logo, favicon, site_title, site_url,site_name } = data;

        // if data image we will delete old image and set new
        // if (image) {
        //     const fileName = path.basename(generalSetting.image.url);
        //     const imagePath = path.join(publicDir, fileName);

        //     fs.unlink(imagePath, (err) => {
        //         if (err) {
        //             console.error(err);
        //         } else {
        //             console.log(` image ${generalSetting?.image.url} deleted`);
        //         }
        //     });
        //     generalSetting.image = image;
        // }
        
        generalSetting.site_logo = site_logo || generalSetting.site_logo;
        generalSetting.favicon = favicon || generalSetting.favicon;
        generalSetting.site_title = site_title || generalSetting.site_title;
        generalSetting.site_url = site_url || generalSetting.site_url;
        generalSetting.site_name = site_name || generalSetting.site_name;
       
        await generalSetting.save();
        return generalSetting;

    }


}