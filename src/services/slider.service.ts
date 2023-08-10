import path from 'path';
import { filesDir, sliderDir } from '../config/storage';
import fs from 'fs';
import { ISlider } from '../interfaces/slider.interface';
import sliderModel from '../models/slider.model';



/**
 *
 *
 * @export
 * @class SliderService
 */
export default class SliderService {

    /**
     * Create  Slider 
     * @param 
     */
    public async createSlider(data: ISlider) {

        let slider = await sliderModel.create(data);
        return slider;
    }


    /**
     * Get slider 
     * @param 
     */
    public async getSlider(id: string) {
        let slider = await sliderModel.findById({ _id: id });
        return slider;
    }


    /**
     * Delete slider 
     * @param 
     */
    public async deleteSlider(id: string) {
        const slider: ISlider | null = await sliderModel.findByIdAndDelete({ _id: id });

        // after deleting we will remove image too
        if (slider) {
            const fileName = path.basename(slider.image?.url);
            const imagePath = path.join(filesDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${slider.image?.url} deleted`);
                }
            });
        }
        return slider;
    }


    /**
     * Get All sliders 
     * @param 
     */
    public async getAllslider(query: any) {
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 10; // the total number of entries on a single page
        const sliders = await sliderModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        return sliders;
    }


    /**
    * Update slider
    * @param data
    */
    public async updateSlider(data: ISlider) {
        let slider: ISlider | null = await sliderModel.findOne({ _id: data.id });
        if (!slider) return null;

        // if data image we will delete old image and set new
        if (data.image) {
            const fileName = path.basename(slider?.image.url);
            const imagePath = path.join(sliderDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(` image ${slider?.image.url} deleted`);
                }
            });
        }


        slider.text_one = data.text_one || slider.text_one;
        slider.image = data.image || slider.image;
        slider.text_two = data.text_two || slider.text_two;
        await slider.save();
        return slider;

    }


}