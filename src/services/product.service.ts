import { IProduct } from '../interfaces/product.interface';
import clickModel from '../models/click.model';
import orderModel from '../models/order.model';
import productModel from '../models/product.model';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import { filesDir } from '../config/storage';
import mongoose from 'mongoose';
import commentModel from '../models/comment.model';
//import bulkUploadModel from '../models/bulk-upload.model';
import categoryModel from '../models/category.model';
import { HttpMessage } from '../exceptions/errorMessages';




/**
 *
 *
 * @export
 * @class ProductService
 */
export default class ProductService {

    /**
     * Create a new product
     * @param data
     */
    public async create(data: IProduct) {
        let product = await productModel.findOne({ title: data.title });

        if (product) return null;

        const options = {
            lower: true,
            strict: true,
            remove: /[^\w\s-]/g,
            replacement: '-'
        };
        data.slug = slugify(data.title, options);
        product = await productModel.create({ ...data });

        return product;

    }


    /**
     * Get all products
     * @param 
     */
    public async getAllProducts(query: any) {
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 100; // the total number of entries on a single page
        let products = await productModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('parent_category')
            .sort({ updatedAt: -1 })
        return products;

    }
    /**
 * Get all products
 * @param 
 */
    public async getAllProductReviews(query: any) {
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 10; // the total number of entries on a single page
        let products = await productModel.find({
            "reviews": {
                $ne: []
            }
        })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('parent_category')
            .sort({ updatedAt: -1 })
        return products;

    }


    /**
     * Get single product
     * @param id
     */
    public async getProduct(id: string) {
        let product = await productModel.findOne({ _id: id }).populate("parent_category", "_id name");
        if (!product) return null;
        return product;


    }

    /**
    * Get  product by slug
    * @param id
    */
    public async getProductBySlug(slug: string) {
        let product = await productModel.findOne({ slug: slug }).populate("parent_category", "_id name");
        if (!product) return null;
        return product;
    }


    /**
     * Delete a  product
     * @param id
     */
    public async deleteProduct(id: string) {
        let product = await productModel.findByIdAndDelete({ _id: id });
        if (!product) return null;


        // Remove the images from the server
        product.images.forEach((image: any) => {
            const fileName = path.basename(image.url);
            const imagePath = path.join(filesDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Image ${image.url} deleted`);
                }
            });
        });

        // Remove the main image from the server
        if (product.main_image) {
            const fileName = path.basename(product.main_image.url);
            const imagePath = path.join(filesDir, fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Main image ${product?.main_image.url} deleted`);
                }
            });
        }
        return product;

    }



    /**
    * Update product
    * @param data
    */
    public async updateProduct(data: any, id: string) {
        let product: IProduct | null = await productModel.findOne({ _id: id });
        if (!product) return null;



        for (const key of Object.keys(data)) {
            if (data[key] !== "" && data[key] !== "images") {
                product[key as keyof IProduct] = data[key];
            }
        }
        await product.save();
        return product;

    }


    /**
   * Update product images
   * @param data
   */
    public async updateProductImages(image: any, id: string) {
        let product: any | null = await productModel.findOne({ _id: id });
        if (!product) return null;


        product.images.push(image);
        await product.save();
        return product;

    }


    /**
 * add  images to product
 * @param data
 */
    public async addProductImages(images: string[], mainImage: string, productId: string) {
        let product: any = await productModel.findOne({ _id: productId });
        if (!product) return null;


        product.images = images;
        product.main_image = mainImage;
        await product.save();
        return product;

    }


    /**
   * Update click on product
   * @param data
   */
    public async updateProductClick(id: string, user_id: string, Ip: string) {
        let product = await productModel.findOne({ _id: id });
        if (!product) return "Not Found";

        // if data has user_id mean click is done by logged-In user
        if (user_id) {
            product = await clickModel.findOne({
                $and: [
                    { user_id: user_id },
                    { product_id: id }
                ]
            });

            if (!product) {
                product = await clickModel.create({
                    product_id: id,
                    user_id: user_id,
                    clicked: 1
                });
            }
        }
        // if unknown user then we add click based on IP
        if (Ip) {
            product = await clickModel.findOne({
                $and: [
                    { Ip: Ip },
                    { product_id: id }
                ]
            });

            if (!product) {
                product = await clickModel.create({
                    product_id: id,
                    Ip: Ip,
                    clicked: 1
                });
            }
        }

        return product;

    }


    /**
  * get mostviewed products
  * @param data
  */
    public async getMostViewedProduct() {

        let products = await clickModel.aggregate([
            { $group: { _id: '$product_id', totalClicks: { $sum: '$clicked' } } },
            { $sort: { totalClicks: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $addFields: { product: { $arrayElemAt: ['$product', 0] } } }
        ]);


        return products;

    }


    /**
    * Get latest products
    * @param 
    */
    public async getlatestProducts() {

        let products = await productModel.find().sort({ createdAt: -1 }).limit(10)
            .populate("parent_category", "name");
        return products;

    }



    /**
   * Get best seller products
   * @param 
   */
    public async getbestSellerProducts() {
        let products = await orderModel.aggregate([
            {
                $unwind: "$items"
            },
            {
                $group: {
                    _id: "$items.productId",
                    totalQuantity: { $sum: "$items.quantity" }
                }
            },
            {
                $sort: { totalQuantity: -1 },

            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product",

            },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.parent_category",
                    foreignField: "_id",
                    as: "product.parent_category"
                }
            },
            {
                $unwind: "$product.parent_category"
            },

            {
                $limit: 10
            }
        ])

        return products;

    }



    /**
     * get Popular Bike Accessories and Helmets
     * Get the most ordered products of a specific category
     * currently we are using this api for getting Popular Bike Accessories and Helmets
     * for home page so i give default categoryId of parent category
     * @param categoryId The ID of the category to filter by
     */
    public async getMostOrderedProductsByCategory(categoryId: string) {
        let products = await orderModel.aggregate([
            {
                $unwind: "$items"
            },

            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product"
                }
            },


            {
                $match: {
                    "product.parent_category": new mongoose.Types.ObjectId(categoryId)
                }
            },
            {
                $group: {
                    _id: "$items.productId",
                    totalQuantity: { $sum: "$items.quantity" }
                }
            },
            {
                $sort: { totalQuantity: -1 },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "product.parent_category",
                    foreignField: "_id",
                    as: "product.parent_category"
                }
            },
            {
                $unwind: "$product.parent_category"
            },
            {
                $limit: 30
            }
        ]);

        return products;
    }



    /**
    * Get top rated products
    * @param 
    */
    public async gettopratedProducts() {

        let products = await productModel.find()
            .populate('parent_category', "name")
            .sort({ average_rating: -1 })
            .limit(10);
        return products;

    }


    /**
   * Get  featured products
   * @param 
   */
    public async getfeaturedProducts() {
        const products = await productModel.aggregate([
            { $match: { featured: true } },
            { $sample: { size: 10 } },
            { $lookup: { from: "categories", localField: "parent_category", foreignField: "_id", as: "parent_category" } },
            { $unwind: "$parent_category" },
            //  { $project: { _id: 1, name: 1, image: 1, price: 1, parent_category: "$parent_category.name" } }
        ]);
        return products;

    }



    /**
     * Search by Keyword
     * @param id
     */
    public async searchProduct(keywords: string, query: any) {
        const page = Number(query.pageNumber) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const products = await productModel.find({ $text: { $search: keywords } })
            .populate("parent_category", "name")
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        return products;

    }




    /**
  * Get All Poducts For Navbar 
  *
  * @param id
  */
    public async getProductNavbar(query: any,) {

        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 100; // the total number of entries on a single page
        const sortValue = query.sortValue || 0;

        let products = await productModel.find()
            .populate("parent_category", "name")
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        return products;

    }


    //** SHOP PAGE  **//
    /**
* Get  Poducts Categroies 
*
* @param id
*/
    public async getProductCategories() {

        //  const C = await productModel.find().distinct('category')//.populate('parent_category');

        const categories = await productModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "parent_category",
                    foreignField: "_id",
                    as: "parent_category"
                }
            },
            {
                $project: {
                    //_id: 0,
                    category: "$category",
                    parent_category: {
                        $arrayElemAt: ["$parent_category.name", 0],

                    },
                    parent_category_id: {
                        $toString: {

                            $arrayElemAt: ["$parent_category._id", 0]
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    parent_category: { $first: "$parent_category" },
                    parent_category_id: { $first: "$parent_category_id" }
                }
            }
        ]);




        return categories;

    }

    /*
    * Get All Poducts For Shoppage based on Category
 * sort by low/high price
 * sort by createdAt
 * get by min/max price
 * default sorting
    * @param id
    */
    public async getProductByCategory(query: any) {
        //  console.log("query", query);
        //{ price: { $gte: min, $lte: max } }
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 10; // the total number of entries on a single page
        const sortValue = query.sortValue || 0;

        let min = Number(query.min) || 0;
        let max = Number(query.max) || 1000000;

        /*
          sortValue 1 for acending order
          sortValue -1 for descening order
          sortValue 0 for default order
          sortValue 2 for  sortBy createdAt (new products);
 
          min,max value to get filter products
          */

        let products;
        if (sortValue == 1 || sortValue == -1) {

            products = await productModel.find({
                category: query.category,
                price: { $gte: min, $lte: max }
            }).sort({ price: sortValue })
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        }
        else if (sortValue == 2) {

            products = await productModel.find({
                category: query.category,
                price: { $gte: min, $lte: max }
            }).sort({ createdAt: -1 })
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        } else if (query.min && query.max) {

            products = await productModel.find({
                category: query.category,
                price: { $gte: min, $lte: max },

            })
                .populate("parent_category", "name")
                // .sort({ parent_category: 'asc', category: 'asc' })
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        }
        else {

            products = await productModel.find({
                category: query.category,
                price: { $gte: min, $lte: max }
            })
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        }

        // let products = await productModel.find({category:query.category})
        //     .populate("parent_category", "name")
        //     .limit(pageSize)
        //     .skip(pageSize * (page - 1));



        return products;

    }


    /**
 * Get All Poducts For Shoppage 
 * sort by low/high price
 * sort by createdAt
 * get by min/max price
 * default sorting
 * @param id
 */
    public async getProductShopPage(query: any,) {

        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 50; // the total number of entries on a single page
        const sortValue = query.sortValue || 0;
        /*
          sortValue 1 for acending order
          sortValue -1 for descening order
          sortValue 0 for default order
          sortValue 2 for  sortBy createdAt (new products);

          min,max value to get filter products
          */
        let products;
        if (sortValue == 1 || sortValue == -1) {

            products = await productModel.find().sort({ price: sortValue })
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        }
        else if (sortValue == 2) {

            products = await productModel.find().sort({ createdAt: -1 })
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        } else if (query.min && query.max) {
            let min = Number(query.min);
            let max = Number(query.max);
            if (!min) min = 50;
            if (!max) min = 1000;

            products = await productModel.find({ price: { $gte: min || 50, $lte: max || 1000 } })
                .populate("parent_category", "name")
                // .sort({ parent_category: 'asc', category: 'asc' })
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        }
        else {

            products = await productModel.find()
                .populate("parent_category", "name")
                .limit(pageSize)
                .skip(pageSize * (page - 1));

        }
        return products;

    }



    /**
 * Get min and min price among products 
 * @param id
 */
    public async getMinMaxProduct() {

        let min = await productModel.findOne().sort({ price: 1 });
        let max = await productModel.findOne().sort({ price: -1 });

        return { min, max };

    }


    /**
 * Bulk Uploads products 
 * @param id
 */
    public async bulkUploadProducts(data: any) {
        // adding slug
        // add quantity
        const options = {
            lower: true,
            strict: true,
            remove: /[^\w\s-]/g,
            replacement: '-'
        };
        data.slug = slugify(data.title, options);
        let parent_category = await categoryModel.findOne({ name: data.parent_category });
        if (!parent_category) return HttpMessage.INVALID_PARENT_CATEGORY + ` for product ${data.title}`;
        data.parent_category = parent_category._id;
        console.log("Service data", data);
        //let product = await bulkUploadModel.create(data);
        let product = await productModel.create(data);


        return product;

    }


}