import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { getUser, verifyAdmin } from '../middlewares/jwt';
import { bulkUpload } from '../middlewares/bulk-upload';


const ProductRoute = Router();
const controller = new ProductController();

/** 
 * create a product
 * only admin can perform this action
 * 
 */
ProductRoute.post("/", verifyAdmin, controller.create);

/** 
 * get most viewed product
 *any user can access this route
 * we will get most viewed product by this end point
 */
ProductRoute.get("/views", controller.getMostViewedProduct);


/** 
 * get best seller product
 *any user can access this route
 * we will get most sold/ordered product by this end point
 */
ProductRoute.get("/best-seller", controller.getbestSellerProducts);

/** 
 * search products based on keyword found in title/description
 * any Admin can access this route
 * 
 */
ProductRoute.get("/admin/search", verifyAdmin, controller.adminSearchProduct);



/** 
 * search products based on keyword found in title/description
 *any user can access this route
 * 
 */
ProductRoute.get("/search", controller.searchProduct);






/** 
 * get Popular Bike Accessories
 *any user can access this route
 * we will get most sold/ordered product have parent category Bike Accessories
 */
ProductRoute.get("/bike-accessories", controller.getPopularBikeAccessoriesAndHelmets);


/** 
 * get top rated products
 * any user can perform this action
 * this api will called on home page 
 */
ProductRoute.get("/top-rated", controller.gettopratedProducts);


/** 
 * get featured products
 * any user can perform this action
 * this api will called on home page 
 */
ProductRoute.get("/featured", controller.getfeaturedProducts);


/** 
 * get latest product
 *any user can access this route
 * 
 */
ProductRoute.get("/latest", controller.getlatestProducts);



/** 
 * get  products for navbar
 *any user can access this route
 *will get three product of each category
 */
ProductRoute.get("/navbar", controller.getProductNavbar);


/** 
 * get  products categories
 *any user can access this route
 *
 */
ProductRoute.get("/categories", controller.getProductCategories);


/** 
 * get  products by category
 *any user can access this route
 *
 */
ProductRoute.get("/product-category", controller.getProductByCategory);

/** 
 * get  products for shop page
 *any user can access this route
 *will get three product of each category
 */
ProductRoute.get("/shop-page", controller.getProductShopPage);


/** 
 * get  product by slug
 *any user can access this route
 *
 */
ProductRoute.get("/slug/:slug", controller.getProductBySlug);


/** 
 * get min max product
 *will be called when shop page load
 *to set min,max value for filter by range
 *
 */
ProductRoute.get("/min-maxProduct", controller.getMinMaxProduct);



/** 
 * get all products
 * any user can perform this action
 * 
 */
ProductRoute.get("/", controller.getAllProducts);


/** 
 * get a product
 * any user can perform this action
 * 
 */
ProductRoute.get("/:id", controller.getProduct);


/** 
 * delete a product
 * only admin can perform this action
 * 
 */
ProductRoute.delete("/:id", verifyAdmin, controller.deleteProduct);


/** 
 * update a product
 * only admin can perform this action
 * 
 */
ProductRoute.put("/:id", verifyAdmin, controller.updateProduct);

/** 
 * update product images
 * when add more image to product
 * only admin can perform this action
 * 
 */
ProductRoute.put("/images/:id", verifyAdmin, controller.updateProductImages);

/** 
 * add  images to product
 * when first time product is updload then set product images
 * only admin can perform this action
 * 
 */
ProductRoute.put("/add-images/:id", verifyAdmin, controller.addProductImages);

/** 
 * update product clicked
 * when user click on any product we will update product clicked
 * based on Ip for unknown users for based on user_id for logged-in users
 * we will update most viewed product by this end point
 */
ProductRoute.put("/click/:id", getUser, controller.updateProductClick);


/** 
 * Bulk Uploads from csv file
 * will pass csv file in right format 
 *  only admin can do this
 * 
 */
ProductRoute.post("/upload", verifyAdmin, bulkUpload, controller.bulkUploadProducts);








export default ProductRoute;