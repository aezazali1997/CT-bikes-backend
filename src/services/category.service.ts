import categoryModel from '../models/category.model';
import { Category } from '../interfaces/category.interface';



/**
 *
 *
 * @export
 * @class CategoryService
 */
export default class CategoryService {

    /**
     * Create a new category
     * @param data
     */
    public async create(data: Category) {
        let category = await categoryModel.findOne({ name: data.name });
        if (category) return null;

        category = await categoryModel.create({ name: data.name });
        return category;

    }


    /**
     * Get all categories
     * @param 
     */
    public async getallCategories() {
        let categories = await categoryModel.find({});
        return categories;

    }


    /**
     * Get single category
     * @param id
     */
    public async getCategory(id: string) {
        let category = await categoryModel.findById({ _id: id });
        if (!category) return null;
        return category;


    }

    /**
     * Get  category by name
     * @param id
     */
    public async getCategoryByName(name: string) {
        let category = await categoryModel.findOne({ name: name });
        if (!category) return null;
        return category;
    }


    /**
     * Delete a  category
     * @param id
     */
    public async deleteCategory(id: string) {
        let category = await categoryModel.findByIdAndDelete({ _id: id });
        if (!category) return null;

        return category;

    }

    /**
    * Update category
    * @param data
    */
    public async updateCategory(data: Category) {
        let category = await categoryModel.findOne({ _id: data.id });
        if (!category) return null;

        category.name = data.name || category.name;
        await category.save();
        return category;

    }


}