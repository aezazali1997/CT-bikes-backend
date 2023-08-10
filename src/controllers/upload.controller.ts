import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import productModel from '../models/product.model';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { filesDir } from '../config/storage';



class UploadController {


    /**
     * Upload single file
     * @param req
     * @param res
     * @param next
     */
    public uploadFile = async (
        req: any,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            if (!req.file) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: HttpMessage.NO_FILE_CHOSEN });
            }

            res.status(HttpCode.OK).json({
                message: 'File uploaded successfully!',
                image: {
                    url: `http://localhost:8000/products/${req.file.filename}`
                }
            });

        } catch (error: any) {
            res.status(500).json({ message: error || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };




    /**
       * Upload Files
       * @param req
       * @param res
       * @param next
       */
    public uploadFiles = async (
        req: any,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (!req.files || req.files.length === 0) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: HttpMessage.NO_FILE_CHOSEN });
            }

            const images = req.files.map((file: any) => {
                return {
                    url: `http://localhost:8000/products/${file.filename}`
                };
            });

            res.status(HttpCode.OK).json({
                message: 'images uploaded successfully!',
                images: images,
            });


        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
       * Delete an image 
       * @param req
       * @param res
       * @param next
       */
    public deleteImage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { productId, imageId } = req.body;
            if (!productId ||
                !mongoose.Types.ObjectId.isValid(productId) ||
                !imageId ||
                !mongoose.Types.ObjectId.isValid(imageId))
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));


            let product = await productModel.findById({ _id: productId });
            if (!product)
                return next(new HttpException(HttpCode.NOT_FOUND, HttpMessage.NOT_FOUND));

            const imageIndex = product.images.findIndex((image: any) => image._id.toString() === imageId.toString());

            if (imageIndex === -1) {
                return next(new HttpException(HttpCode.NOT_FOUND, HttpMessage.NOT_FOUND));
            }

            const image = product.images[imageIndex];
            const fileName = path.basename(image.url);
            const imagePath = path.join(filesDir, fileName);


            // delete the image file from the server
            fs.unlink(imagePath, (err) => {
                if (err) {
                    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, "Something went wrong while deleting file from server"));
                }
                else {
                    console.log("image removed")
                }
            });

            product = await productModel.findOneAndUpdate(
                { _id: productId, 'images._id': imageId },
                { $pull: { images: { _id: imageId } } },
                { new: true }
            );
            return res.json({
                message: `image deleted`,
                product: product,
            });

        } catch (error: any) {
            res.status(500).json({ message: error || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
      * Update main image 
      * @param req
      * @param res
      * @param next
      */
    public updateMainImage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { productId, url } = req.body;
            if (!productId || !url || !mongoose.Types.ObjectId.isValid(productId))
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));


            let product = await productModel.findById({ _id: productId });
            if (!product)
                return next(new HttpException(HttpCode.NOT_FOUND, HttpMessage.NOT_FOUND));

            // delete old image from server

            const image = product.main_image;
            const fileName = path.basename(image.url);
            const imagePath = path.join(filesDir, fileName);


            fs.unlink(imagePath, (err) => {
                if (err) {
                    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, "Something went wrong while deleting file from server"));
                }
                else {
                    console.log("image removed")
                }
            });

            product.main_image = { url: url };
            product = await product.save();
            return res.json({
                message: `image updated`,
                product: product,
            });

        } catch (error: any) {
            res.status(500).json({ message: error || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };

}

export default UploadController;
