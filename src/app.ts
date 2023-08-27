import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import root from './root';
import connectDB from './config/db';
import CategoryRoute from './routes/category.route';
import errorMiddleware from './middlewares/error-handler';
import CountryRoute from './routes/country.route';
import ProductRoute from './routes/product.route';
import { API_BASE_PATH, ORIGIN } from './config';
import ReviewRoute from './routes/review.route';
import UserRoute from './routes/user.router';
import CartRoute from './routes/cart.route';
import OrderRoute from './routes/order.route';
import CouponRoute from './routes/coupon.route';
import WishlistRoute from './routes/wishlist.route';
import PaymentRoute from './routes/payment.route';
import fs from 'fs';
import UploadRoute from './routes/upload.router';
import CommentRoute from './routes/comment.route';
import AppstoreRoute from './routes/appstore.route';
import { filesDir, sliderDir } from './config/storage';
import AboutusRoute from './routes/aboutus.route';
import ReturnPolicyRoute from './routes/return-policy.router';
import OrderTrackingRoute from './routes/order-tracking.route';
import SocialMediaRoute from './routes/social-media.route';
import SliderRoute from './routes/slider.route';
import MoneybackGuaranteeRoute from './routes/moneybackGuarantee.route';
import SafeShoppingRoute from './routes/safe-shopping.route';
import ContactusRoute from './routes/contactus.route';
import GeneralSettingRoute from './routes/general-setting.route';
import NotificationRoute from './routes/notification.routes';
import EbaySecretsRouter from './routes/ebaysecrets.route';
import AmazonSecretsRouter from './routes/amazonsecrets.route';
import PayPalSecretsRouter from './routes/paypalscrets.route';
import { viewRouter } from './routes/view.routes';


class App {
    public app: Application;

    constructor() {
      this.app = express();
      this.config();
      this.seeding();
      this.routes();
      // this.initStorage();
    }

    private config(): void {

        this.app.use(cors({ origin: ORIGIN }));
        this.app.use(morgan('combined'));
        this.app.use(helmet());
        this.app.use(compression({
            level: 6,
            threshold: 100 * 1000,
            filter: (req: Request, res: Response) => {
                if (req.headers['x-no-compression']) {
                    return false;
                }
                return true;
            }
        }));

        this.app.use(express.json());
        this.app.use(express.static(path.join(root, 'public')));
        this.app.use("/products", express.static(path.join(root, 'public', 'products')));
        this.app.use("/slider", express.static(path.join(root, 'public', 'slider')));
    }

    private routes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send({
                message: "Welcome to CT BIKES"
            });
        });
        this.app.use(`${API_BASE_PATH}/category`, CategoryRoute);
        this.app.use(`${API_BASE_PATH}/country`, CountryRoute);
        this.app.use(`${API_BASE_PATH}/product`, ProductRoute);
        this.app.use(`${API_BASE_PATH}/review`, ReviewRoute);
        this.app.use(`${API_BASE_PATH}/user`, UserRoute);
        this.app.use(`${API_BASE_PATH}/cart`, CartRoute);
        this.app.use(`${API_BASE_PATH}/order`, OrderRoute);
        this.app.use(`${API_BASE_PATH}/coupon`, CouponRoute);
        this.app.use(`${API_BASE_PATH}/wishlist`, WishlistRoute);
        this.app.use(`${API_BASE_PATH}/payment`, PaymentRoute);
        this.app.use(`${API_BASE_PATH}/upload`, UploadRoute);
        this.app.use(`${API_BASE_PATH}/comment`, CommentRoute);
        this.app.use(`${API_BASE_PATH}/appstore`, AppstoreRoute);
        this.app.use(`${API_BASE_PATH}/about-us`, AboutusRoute);
        this.app.use(`${API_BASE_PATH}/return-policy`, ReturnPolicyRoute);
        this.app.use(`${API_BASE_PATH}/order-tracking`, OrderTrackingRoute);
        this.app.use(`${API_BASE_PATH}/social-media`, SocialMediaRoute);
        this.app.use(`${API_BASE_PATH}/slider`, SliderRoute);
        this.app.use(`${API_BASE_PATH}/view`, viewRouter);

        this.app.use(`${API_BASE_PATH}/moneyback-guarantee`, MoneybackGuaranteeRoute);
        this.app.use(`${API_BASE_PATH}/safe-shopping`, SafeShoppingRoute);
        this.app.use(`${API_BASE_PATH}/contact-us`, ContactusRoute);
        this.app.use(`${API_BASE_PATH}/view`, ContactusRoute);

        this.app.use(`${API_BASE_PATH}/general-setting`, GeneralSettingRoute);
        this.app.use(`${API_BASE_PATH}/notification`, NotificationRoute);
        this.app.use(`${API_BASE_PATH}/ebay-secrets`, EbaySecretsRouter);
        this.app.use(`${API_BASE_PATH}/amazon-secrets`, AmazonSecretsRouter);
        this.app.use(`${API_BASE_PATH}/paypal-secrets`, PayPalSecretsRouter);




        this.app.use(errorMiddleware);
        // Handle unmatch route
        this.app.use('*', (req: Request, res: Response) => {
            res.sendFile(path.join(root, 'public', 'error.html'));
        });
    }

    private async seeding(): Promise<void> {

        // await initAdmin();
        //  await initCategory();
        // await initAppstore();
        //  await initAboutus();
        //await  initReturnPolicy();
        // await  initOrderTracking();
        //  await initCountries();
        console.log("SEEDING DONE!...");
        connectDB(this.app)
    }

    private initStorage(): void {

        if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir);
        }
        if (!fs.existsSync(sliderDir)) {
            fs.mkdirSync(sliderDir);
        }
    }

}

export default new App().app;