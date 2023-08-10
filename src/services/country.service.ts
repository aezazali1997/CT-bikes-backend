import countryModel from '../models/country.model';
import { ICountry } from '../interfaces/country.interface';
import mongoose from 'mongoose';



/**
 *
 *
 * @export
 * @class CountryService
 */
export default class CountryService {

    /**
     * Create a new country
     * @param data
     */
    public async create(data: ICountry) {
        let country: any = await countryModel.findOne({ name: data.name })
        if (country) return null;

        country = await countryModel.create(data);
        return country;

    }


    /**
     * Get all countries
     * @param 
     */
    public async getallCountries() {
        let countries = await countryModel.find({});
        return countries;

    }


    /**
     * Get single country
     * @param id
     */
    public async getCountry(identifier:string) {
      let country;
      // Check if the identifier is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        country= await countryModel.findOne( {_id:identifier});
         
      } else {
        country = await  countryModel.findOne( {name:identifier});
      }
        if (!country) return null;
        return country;


    }


    /**
     * Delete a  country
     * @param id
     */
    public async deleteCountry(id: string) {
        let country = await countryModel.findByIdAndDelete({ _id: id });
        if (!country) return null;

        return country;

    }

    /**
    * Update country
    * @param data
    */
    public async updateCountry(data: ICountry) {
        let country = await countryModel.findOne({ _id: data.id });
        if (!country) return null;
        country.name = data.name || country.name;
        country.disabled = data.disabled || country.disabled;
        country.shipping_fee = data.shipping_fee || country.shipping_fee;
        country.states = data.states || country.states;
        await country.save();
        return country;

    }


}