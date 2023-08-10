import Joi from 'joi';
import { IProduct } from '../interfaces/product.interface';
export const createProduct = async (data: IProduct) => {
    const productschema = Joi.object().keys({
        title: Joi.string().min(1).required(),
        description: Joi.string().allow(""),
        brand: Joi.string().allow(""),
        parent_category: Joi.string().min(1).required(),
        category: Joi.string().min(1).required(),
        price: Joi.number().required(),
        comparePrice: Joi.number().required(),
        quantity_in_stock: Joi.number().required(),
        images: Joi.array().items(Joi.object()).required(),
        variations: Joi.array().items(Joi.object()),
        main_image: Joi.object().required(),
        featured: Joi.boolean(),
        top_rated: Joi.boolean(),
        best_sellor: Joi.boolean(),
        popular: Joi.boolean(),

        // seo related stuff
        meta_title: Joi.string().allow(""),
        meta_description: Joi.string().allow(""),
        canonical_url: Joi.string().allow(""),
        keywords: Joi.array().items(Joi.string()),
        tags: Joi.array().items(Joi.string()),
    });

    return productschema.validate(data)

}

export const updateProduct = async (data: IProduct) => {
    const productschema = Joi.object().keys({
        title: Joi.string().allow(""),
        description: Joi.string().allow(""),
        brand: Joi.string().allow(""),
        parent_category: Joi.string().allow(""),
        category: Joi.string().allow(""),
        price: Joi.number(),
        comparePrice: Joi.number(),
        quantity_in_stock: Joi.number(),
        variations: Joi.array(),
        main_image: Joi.object().keys({
            url: Joi.string().allow("")
        }),
        featured: Joi.boolean(),
        top_rated: Joi.boolean(),
        best_sellor: Joi.boolean(),
        popular: Joi.boolean(),
        images: Joi.array(),

        // seo related stuff
        meta_title: Joi.string().allow(""),
        meta_description: Joi.string().allow(""),
        canonical_url: Joi.string().allow(""),
        keywords: Joi.array().items(Joi.string()),
        tags: Joi.array().items(Joi.string()),
    });

    return productschema.validate(data)

}