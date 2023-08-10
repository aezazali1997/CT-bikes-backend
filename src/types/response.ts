
// this function will transform response for
// bestsellor api
export const responseBestSellor = async (products: any) => {
  let response: any = products.map((item: any) => {
    const {
      totalQuantity,
      _id,
      product: {
        title,
        slug,
        description,
        parent_category,
        category,
        price,
        comparePrice,
        quantity,
        quantity_in_stock,
        sku,
        images,
        main_image,
        featured,
        createdAt,
        updatedAt,
        __v,
        average_rating,
        reviews
      }
    } = item;

    return {
      totalQuantity,
      _id,
      title,
      description,
      slug,
      parent_category,
      category,
      price,
      comparePrice,
      quantity,
      quantity_in_stock,
      sku,
      images,
      main_image,
      featured,
      createdAt,
      updatedAt,
      __v,
      average_rating,
      reviews
    };
  });

  return response; // add return statement to return the transformed response
}


// this function will transform response for
// bestsellor api, get Popular Bike Accessories and Helmets
export const responseBikeAccessoriesAndHelmets = async (products: any) => {
  let response: any = products.map((item: any) => {
    const {
      totalQuantity,
      _id,
      product: {
        title,
        description,
        slug,
        parent_category,
        category,
        price,
        comparePrice,
        quantity,
        quantity_in_stock,
        sku,
        images,
        main_image,
        featured,
        createdAt,
        updatedAt,
        __v,
        average_rating,
        reviews
      }
    } = item;

    return {
      totalQuantity,
      _id,
      title,
      description,
      slug,
      parent_category,
      category,
      price,
      comparePrice,
      quantity,
      quantity_in_stock,
      sku,
      images,
      main_image,
      featured,
      createdAt,
      updatedAt,
      __v,
      average_rating,
      reviews
    };
  });

  // sort the products based on their average_rating
  response.sort((a: any, b: any) => {
    return b.average_rating - a.average_rating;
  });

  return response; // add return statement to return the transformed response
}


// this function will transform response for
// get mostviewed products
export const responseMostViewed = async (products: any) => {
  let response: any = products.map((item: any) => {
    const {
      totalClicks,
      _id,
      product: {
        title,
        description,
        slug,
        parent_category,
        category,
        price,
        comparePrice,
        quantity,
        quantity_in_stock,
        sku,
        images,
        main_image,
        featured,
        createdAt,
        updatedAt,
        __v,
        average_rating,
        reviews
      }
    } = item;

    return {
      totalClicks,
      _id,
      title,
      description,
      slug,
      parent_category,
      category,
      price,
      comparePrice,
      quantity,
      quantity_in_stock,
      sku,
      images,
      main_image,
      featured,
      createdAt,
      updatedAt,
      __v,
      average_rating,
      reviews
    };
  });

  return response; // add return statement to return the transformed response
}

/*
* shop page all api response
*/

export const responseShopPageProducts = async (products: any) => {

  const transformedProducts = products.map((product: any) => {
    return {
      _id: product._id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      parent_category: product.parent_category.name,
      category: product.category,
      price: product.price,
      comparePrice: product.comparePrice,
      quantity: product.quantity,
      quantity_in_stock: product.quantity_in_stock,
      sku: product.sku,
      images: product.images,
      main_image: product.main_image,
      __v: product.__v,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  })

  // sort the products by price in ascending order
  // transformedProducts.sort((a:any, b:any) => a.price - b.price)

  // group the products by parent_category and category
  const groupedProducts = transformedProducts.reduce((acc: any, curr: any) => {
    const parentCategory = curr.parent_category
    const category = curr.category

    // check if the parent_category already exists in the accumulator
    const parentCategoryIndex = acc.findIndex((item: any) => item.parent_category === parentCategory)

    if (parentCategoryIndex !== -1) {
      // if the parent_category already exists, check if the category already exists
      const categoryIndex = acc[parentCategoryIndex].category.findIndex((item: any) => item.name === category)

      if (categoryIndex !== -1) {
        // if the category already exists, push the product to the products array of the category
        acc[parentCategoryIndex].category[categoryIndex].products.push(curr)
      } else {
        // if the category doesn't exist, add the category and the product to the parent_category
        acc[parentCategoryIndex].category.push({
          name: category,
          products: [curr]
        })
      }
    } else {
      // if the parent_category doesn't exist, add the parent_category, category, and the product to the accumulator
      acc.push({
        parent_category: parentCategory,
        category: [{
          name: category,
          products: [curr]
        }]
      })
    }

    return acc
  }, [])
  return groupedProducts; // add return statement to return the transformed response
}





// this function will sort based on parent category and category response for
// get shop page res in alphabetical order
export const sortByAlphabeticalOrder = async (products: any) => {

  products.sort((a: any, b: any) => {
    if (a.parent_category.toLowerCase() < b.parent_category.toLowerCase()) {
      return -1;
    }
    if (a.parent_category.toLowerCase() > b.parent_category.toLowerCase()) {
      return 1;
    }
    // If parent categories are the same, sort based on length of string
    // Shorter string should come first
    if (a.parent_category.length < b.parent_category.length) {
      return -1;
    }
    if (a.parent_category.length > b.parent_category.length) {
      return 1;
    }
    return 0;
  });

  products.forEach((item: any) => {
    item.category.sort((a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      // If parent categories are the same, sort based on length of string
      // Shorter string should come first
      if (a.name.length < b.name.length) {
        return -1;
      }
      if (a.name.length > b.name.length) {
        return 1;
      }
      return 0;
    });
  });

  return products;

}


// this function transform response for home page
// distinct categories along with parent category
export const responseShopPageCategories = async (categories: any) => {
  let response: any = [];

  categories.forEach((category: any) => {
    let parentCategory = category.parent_category;
    let existingParent = response.find((p: any) => p.parent_category === parentCategory);
    if (!existingParent) {
      existingParent = { parent_category: parentCategory, category: [], _id: category.parent_category_id };
      response.push(existingParent);
    }
    existingParent.category.push({ name: category._id });
  });

  return response;
}