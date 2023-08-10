import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import ProductService from '../services/product.service';
import { createProduct, updateProduct } from '../validator/product';
import { responseBestSellor, responseShopPageProducts, responseMostViewed, sortByAlphabeticalOrder, responseShopPageCategories, responseBikeAccessoriesAndHelmets } from '../types/response';
import mongoose from 'mongoose';
import CategoryService from '../services/category.service';
import xlsx from 'xlsx';




class ProductController {
  service = new ProductService();
  categoryService = new CategoryService();


  /**
   * Create a new product
   * @param req
   * @param res
   * @param next
   */
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { error } = await createProduct(req.body);
      if (error) {
        return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
      }

      const product = await this.service.create(req.body);
      if (!product) {
        return next(new HttpException(HttpCode.CONFLICT, `product with same title ${HttpMessage.CONFLICT}`));
      }
      return res.json({
        message: `${HttpMessage.CREATED}`,
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Get all products
   * @param req
   * @param res
   * @param next
   */
  public getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const products = await this.service.getAllProducts(req.query);
      let newProducts = products.map((product: any) => {
        return {
          _id: product.id,
          image: product.main_image.url,
          title: product.title,
          parent_category: product.parent_category.name,
          category: product.category,
          price: product.price,
          comparePrice: product.comparePrice,
          quantity_in_stock: product.quantity_in_stock,
        }
      })
      return res.json({
        message: "all products",
        products: newProducts,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Get a product
   * @param req
   * @param res
   * @param next
   */
  public getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const product = await this.service.getProduct(req.params.id);
      if (!product) {
        return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "product",
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
   * Get a product by slug
   * @param req
   * @param res
   * @param next
   */
  public getProductBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const slug = req.params.slug;
      if (!slug)
        return next(new HttpException(HttpCode.BAD_REQUEST, HttpMessage.BAD_REQUEST));

      const product = await this.service.getProductBySlug(req.params.slug);
      if (!product) {
        return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      }
      // adding total reviews for product detail page
      let total_reviews = product.reviews ? product.reviews.length : 0;
      return res.json({
        message: "product",
        product: { ...product._doc, total_reviews }
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Delete a product
   * @param req
   * @param res
   * @param next
   */
  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const product = await this.service.deleteProduct(req.params.id);
      if (!product) {
        return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      }
      return res.json({
        message: "product deleted",
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };




  /**
  * Update a  product
  * @param req
  * @param res
  * @param next
  */
  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error } =
        await updateProduct(req.body);
      if (error) {
        return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
      }

      const product = await this.service.updateProduct(req.body, req.params.id);
      if (!product) return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "updated",
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };

  /**
  * Update a  product images
  * @param req
  * @param res
  * @param next
  */
  public updateProductImages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      if (!req.body.image) {
        return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
      }

      const product = await this.service.updateProductImages(req.body.image, req.params.id);
      if (!product) return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "images updated",
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
  * Update a  product images{number}
  * @param req
  * @param res
  * @param next
  */
  public addProductImages = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { images, mainImage } = req.body;
      const productId = String(req.params.id);
      if (!images || !mainImage || !productId) {
        return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
      }

      const product = await this.service.addProductImages(images, mainImage, productId);
      if (!product) return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      return res.json({
        message: "images added to product",
        product: product,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
  * Update  product clicked
  * @param req
  * @param res
  * @param next
  */
  public updateProductClick = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let product;
      const user = req.user;
      // if click is done by ct-bike logged in user
      if (user) {
        product = await this.service.updateProductClick(req.params.id, user._id, "");
      }

      // if click is done by unknow user
      else {
        const Ip: any = (req.headers['x-forwarded-for'] as string)?.split(',').shift()
          || req.socket?.remoteAddress || null
        product = await this.service.updateProductClick(req.params.id, "", Ip);
      }

      if (product === "Not Found") return next(new HttpException(HttpCode.NOT_FOUND, `product ${HttpMessage.NOT_FOUND}`));
      // if (!product) return next(new HttpException(HttpCode.BAD_REQUEST, `product already clicked`));

      return res.json({
        message: "click incremented",
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  };


  /**
  *Get most viewed product
  * @param req
  * @param res
  * @param next
  */
  public getMostViewedProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let products = await this.service.getMostViewedProduct();
      products = await responseMostViewed(products);
      return res.json({
        message: "most viewed products",
        product: products,
      });

    } catch (error: any) {

      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };




  /**
  *Get latest products
  * @param req
  * @param res
  * @param next
  */
  public getlatestProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const products = await this.service.getlatestProducts();

      return res.json({
        message: "latest products",
        product: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Get top rated Products
   * @param req
   * @param res
   * @param next
   */
  public gettopratedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const items = await this.service.gettopratedProducts();
      return res.json({
        message: "top rated products",
        products: items,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
     * Get featured products
     * @param req
     * @param res
     * @param next
     */
  public getfeaturedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const products = await this.service.getfeaturedProducts();
      return res.json({
        message: "featured products",
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
     * Get best sellor products
     * @param req
     * @param res
     * @param next
     */
  public getbestSellerProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      let products = await this.service.getbestSellerProducts();
      products = await responseBestSellor(products);
      return res.json({
        message: "best seller products",
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
     * Get Popular Bike Accessories and Helmets
     * @param req
     * @param res
     * @param next
     */
  public getPopularBikeAccessoriesAndHelmets = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let parentCategory = await this.categoryService.getCategoryByName("Bike Accessories");
      const products = await this.service.getMostOrderedProductsByCategory(parentCategory?._id);


      let Accessories: any = [];
      let Helmets: any = [];
      const category = ["Helmets", "Helmet", "helmets", "helmet"];


      for (let item of products) {
        //if (item.product?.parent_category?.name == "Bike Accessories") {
        //  Accessories.push(item)
        if (
          category.includes(item.product?.category) ||
          category.some(c => item.product?.title?.includes(c)) ||
          category.some(c => item.product?.description?.includes(c))
        ) {
          Helmets.push(item)
        }
        // }

      }
      Accessories = await responseBikeAccessoriesAndHelmets(products);
      Helmets = await responseBikeAccessoriesAndHelmets(Helmets);
      return res.json({
        message: "Popular Bike Accessories and Helmets",
        Accessories: Accessories,
        Helmets: Helmets
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
    * Search  products
    * @param req
    * @param res
    * @param next
    */
  public searchProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const keywords = req.query.text;
      if (!keywords)
        return next(new HttpException(HttpCode.BAD_REQUEST, `${HttpMessage.BAD_REQUEST}`));

      let products = await this.service.searchProduct(req.query.text as string, req.query);
      products = await responseShopPageProducts(products);
      return res.json({
        message: `products with keyword ${keywords}`,
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  adminSearchProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const keywords = req.query.text;
      if (!keywords)
        return next(new HttpException(HttpCode.BAD_REQUEST, `${HttpMessage.BAD_REQUEST}`));

      let products = await this.service.searchProduct(req.query.text as string, req.query);

      let newProducts = products.map((product: any) => {
        return {
          id: product.id,
          image: product.main_image.url,
          title: product.title,
          mainCategory: product.parent_category.name,
          subCategory: product.category,
          price: product.price,
          discountPrice: product.comparePrice,
          stock: product.quantity_in_stock,
        }
      })

      return res.json({
        message: `products with keyword ${keywords}`,
        products: newProducts,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
    }
  }

  // SHOP PAGE //
  /**
   * get min and max value from product collection 
   * for filter by range
   * @param req
   * @param res
   * @param next
   */
  public getMinMaxProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {


      let products = await this.service.getMinMaxProduct();

      return res.json({
        message: `products with min and max  Price`,
        min: products?.min?.price || 50,
        max: products?.max?.price || 300,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };




  /**
    * Get Products for Navbar 
    * @param req
    * @param res
    * @param next
    */
  public getProductNavbar = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let products = await this.service.getProductNavbar(req.query);

      products = await responseShopPageProducts(products);
      products = await sortByAlphabeticalOrder(products);

      return res.json({
        message: `products for navbar`,
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
    * Get Products Categories 
    * @param req
    * @param res
    * @param next
    */
  public getProductCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let categories = await this.service.getProductCategories();

      categories = await responseShopPageCategories(categories);
      categories = await sortByAlphabeticalOrder(categories);
      return res.json({
        message: `categories`,
        categories: categories,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Get Products By Category for shop page
   * @param req
   * @param res
   * @param next
   */
  public getProductByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      let products = await this.service.getProductByCategory(req.query);

      return res.json({
        name: req.query.category || products[0].category,
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };



  /**
    * Get Products for Shop Page 
    * @param req
    * @param res
    * @param next
    */
  public getProductShopPage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { min, max } = req.query;
      if (max && min) {
        if (Number(max) < Number(min)) {
          return res.status(400).json({ message: "Bad Request" });
        }
      }

      let products = await this.service.getProductShopPage(req.query);

      products = await responseShopPageProducts(products);
      products = await sortByAlphabeticalOrder(products);

      return res.json({
        message: `products for home page`,
        products: products,
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };


  /**
   * Bulk Uploads Products
   * @param req
   * @param res
   * @param next
   */
  public bulkUploadProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json('No file uploaded.');
        return;
      }


      // if (file.mimetype === 'text1/csv1') {
      //   console.log("If---------->");
      //   /*
      //   const csvData = file.buffer.toString('utf8');
      //   console.log(csvData);
      //   const rows = csvData.split('\n'); // Split CSV into rows
      //   const fieldNames = rows[0].split(',');

      //   for (let i = 1; i < rows.length; i++) {
      //     const rowData = rows[i].split(',');
      //     console.log("row data ------> ", rowData);

      //     // Skip empty rows
      //     // Check if all values in the rowData array are empty or contain only whitespace
      //     if (rowData.every(value => value.trim() === '')) {
      //       continue;
      //     }

      //     const data: any = {};
      //     for (let j = 0; j < fieldNames.length; j++) {
      //       const fieldName = fieldNames[j];
      //       let fieldValue = rowData[j];

      //       // Check if field value exists
      //       if (fieldValue !== undefined && fieldValue !== null) {
      //         // Trim field value and remove surrounding quotes if present
      //         fieldValue = fieldValue.trim();
      //         if (fieldValue.startsWith('"') && fieldValue.endsWith('"')) {
      //           fieldValue = fieldValue.slice(1, -1);
      //         }

      //         // Remove quotes around URLs
      //         if (fieldName === 'images' || fieldName === 'main_image') {
      //           fieldValue = fieldValue.replace(/"/g, '');
      //           const imageUrls = fieldValue.split('\n').map(url => url.trim()).filter(url => url !== '');

      //           if (fieldName === 'images') {
      //             const images = imageUrls.map(url => ({ url }));
      //             data[fieldName] = images;
      //           } else {
      //             const mainImage = { url: fieldValue };
      //             data[fieldName] = mainImage;
      //           }
      //         } else if (fieldName === 'tags') {
      //           const tags = fieldValue.split('\n').map(tag => tag.trim()).filter(tag => tag !== '');
      //           data[fieldName] = tags;
      //         } else {
      //           // Check if field value contains multiple values
      //           if (fieldValue.includes('\n')) {
      //             const values = fieldValue.split('\n').map(value => value.trim()).filter(value => value !== '');
      //             data[fieldName] = values;
      //           } else {
      //             data[fieldName] = fieldValue;
      //           }
      //         }
      //       }
      //     }

      //     // Pass the data object to the bulkUploadProducts method of your service
      //     await this.service.bulkUploadProducts(data);
      //   }

      //   return res.json({
      //     message: 'Products uploaded.',
      //   });

      //   */
      //  //------>

      //  const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      //  const sheetName = workbook.SheetNames[0];
      //  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      //  // Get the field names from the first row
      //  const fieldNames: any = sheetData[0];

      //  for (let i = 1; i < sheetData.length; i++) {
      //    const rowData: any = sheetData[i];

      //    const data: any = {};
      //    for (let j = 0; j < fieldNames.length; j++) {
      //      const fieldName = fieldNames[j];
      //      let fieldValue = rowData[j];

      //      // Remove quotes around URLs
      //      if (fieldValue && (fieldName === 'images' || fieldName === 'main_image')) {
      //        fieldValue = fieldValue.replace(/"/g, '');
      //        const imageUrls = fieldValue.split('\n').map((url: any) => url.trim()).filter((url: any) => url !== '');

      //        if (fieldName === 'images') {
      //          const images = imageUrls.map((url: any) => ({ url }));
      //          data[fieldName] = images;
      //        } else {
      //          const mainImage = { url: fieldValue };
      //          data[fieldName] = mainImage;
      //        }
      //      }
      //      else if (fieldName === 'tags') {
      //        const tags = fieldValue.split('\n').map((tag: any) => tag.trim()).filter((tag: any) => tag !== '');
      //        data[fieldName] = tags;
      //      }
      //      else {
      //        data[fieldName] = fieldValue;
      //      }
      //    }



      //    // Pass the data object to the bulkUploadProducts method of your service
      //   let result = await this.service.bulkUploadProducts(data);
      //   if(result == HttpMessage.INVALID_PARENT_CATEGORY){
      //     res.status(400).json({error:result});
      //   }
      //  }




      //  return res.json({
      //    message: 'Products uploaded.',
      //  });

      //  //------>
      // }



      if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Get the field names from the first row
        const fieldNames: any = sheetData[0];

        for (let i = 1; i < sheetData.length; i++) {
          const rowData: any = sheetData[i];

          const data: any = {};
          for (let j = 0; j < fieldNames.length; j++) {
            const fieldName = fieldNames[j];
            let fieldValue = rowData[j];

            // Remove quotes around URLs
            if (fieldValue && (fieldName === 'images' || fieldName === 'main_image')) {
              fieldValue = fieldValue.replace(/"/g, '');
              const imageUrls = fieldValue?.split('\n').map((url: any) => url.trim()).filter((url: any) => url !== '');

              if (fieldName === 'images') {
                const images = imageUrls.map((url: any) => ({ url }));
                data[fieldName] = images;
              } else {
                const mainImage = { url: fieldValue };
                data[fieldName] = mainImage;
              }
            }
            else if (fieldName === 'tags') {
              const tags = fieldValue?.split('\n').map((tag: any) => tag.trim()).filter((tag: any) => tag !== '');
              data[fieldName] = tags;
            }
            else if (fieldName === 'keywords') {
              const keywords = fieldValue?.split('\n').map((keyword: any) => keyword.trim()).filter((keyword: any) => keyword !== '');
              data[fieldName] = keywords;
            }
            else {
              data[fieldName] = fieldValue;
            }
          }



          // Pass the data object to the bulkUploadProducts method of your service
          // Pass the data object to the bulkUploadProducts method of your service
          let result = await this.service.bulkUploadProducts(data);
          if (result == HttpMessage.INVALID_PARENT_CATEGORY) {
            res.status(400).json({ error: result });
          }
        }




        return res.json({
          message: 'Products uploaded.',
        });


      }
      else {
        res.status(400).send('Unsupported file format.');
      }

    } catch (error: any) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate key error
        const duplicateKey = error.keyValue.title; // Assuming 'title' is the duplicated field
        const errorMessage = `Duplicate key error. The value '${duplicateKey}' already exists.`;

        return res.status(400).json({
          message: errorMessage,
        });
      }
      res.status(500).json({ message: error || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

    }
  };

}

export default ProductController;
