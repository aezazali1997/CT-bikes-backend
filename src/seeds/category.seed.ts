import categoryModel from "../models/category.model"



export async function initCategory() {
    const categories = ['Bike Accessories', 'Bikes', 'BMX Bikes', 'Brands Primary', 'Footwear', 'Clearance']

    try {
        for (const categoryName of categories) {
            const query = { name: categoryName }
            const update = { name: categoryName }
            const options = { upsert: true, new: true }
            const category = await categoryModel.findOneAndUpdate(query, update, options)
            // if (category) {
            //     console.log(`Category '${categoryName}' seeded successfully.`)
            // }
        }
    } catch (err) {
        console.log("Error while seed  category")
    }
}