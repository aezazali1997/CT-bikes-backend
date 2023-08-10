import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import UserService from '../services/user.service';
import { changePasswordValidation, loginValidation, signupValidation } from '../validator/user';
import jwt from 'jsonwebtoken';
import {
    JWT_FORGET_PASSWORD, JWT_SECRET_KEY, MAIL_FROM,
    MAIL_HOST,
    MAIL_PORT,
    NODE_ENV,
    MAIL_SECURE,
    MAIL_USER,
    MAIL_PASSWORD,
} from '../config';
import nodemailer from 'nodemailer';
import userModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { sendEmailForgetPassword } from '../services/mail.service';
import cartModel from '../models/cart.model';


class UserController {
    service = new UserService();


    /**
     * Create new user
     * @param req
     * @param res
     * @param next
     */
    public signup = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            let { error } = await signupValidation(req.body);
            if (error) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
            }

            let user = await this.service.findByEmail(req.body.email_address);
            if (user) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `user already exists with this email`));
            }
            user = await this.service.signup(req.body);
            return res.json({
                message: `${HttpMessage.CREATED}`,
                user: user,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };


    /**
     * login a user
     * @param req
     * @param res
     * @param next
     */
    public login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            let { error } = await loginValidation(req.body);
            if (error) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
            }

            const user = await this.service.findByEmail(req.body.email_address);
            const comparePassword = await user?.matchPassword(req.body.password);
            if (!user || !comparePassword) {
                return next(new HttpException(HttpCode.UNAUTHORIZED, `Invalid Credentials`));
            }

            // create cart
            let cart = await cartModel.findOne({ userId: user._id });

            if (!cart) {
                await cartModel.create({ userId: user._id, items: [] });
            }
            // Create token
            const token = jwt.sign(
                { id: user._id },
                String(JWT_SECRET_KEY),
                {
                    expiresIn: "3d",
                }
            );
            return res.json({
                message: "login successfully",
                token: token,
                user: user,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })

        }
    };



    /**
    * forget password send mail
    * @param req
    * @param res
    * @param next
    */
    public sendMailForgetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (!req.body.email_address) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            const user = await this.service.findByEmail(req.body.email_address);
            if (!user) {
                return next(new HttpException(HttpCode.NOT_FOUND, `Invalid Email Address`));
            }

            // Create token
            const token = jwt.sign(
                { id: user._id },
                String(JWT_FORGET_PASSWORD),
                {
                    expiresIn: "15m",
                }
            );
            await sendEmailForgetPassword(token, user.email_address, `${user.first_name} ${user.last_name}`)
            user.password_token = token;
            await user.save();
            return res.status(200).json({ message: HttpMessage.EMAIL_SEND });

        } catch (error: any) {
            console.log('res', error)
            res.status(500).json({ message: `${HttpMessage.INTERNAL_SERVER_ERROR} try again` })

        }
    };


    /**
   * reset password
   * @param req
   * @param res
   * @param next
   */
    public resetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            if (!req.body.password) {
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            // verifying token
            const token = req.body.token || req.query.token || req.headers["x-access-token"];

            if (!token) {
                return next(new HttpException(HttpCode.FORBIDDEN, HttpMessage.FORBIDDEN));
                //if user don,t send token
            }

            // check token
            const decoded: any = jwt.verify(token, String(JWT_FORGET_PASSWORD));
            const user: IUser | null = await userModel.findById({ _id: decoded?.id });
            if (!user || !user.password_token) {
                // if no user ID or password changed recently having no token in db for user
                return next(new HttpException(HttpCode.BAD_REQUEST, "Bad Request"));
            }

            // check if user send his previous password
            const comparePassword = await user?.matchPassword(req.body.password);
            if (comparePassword) {
                return next(new HttpException(HttpCode.BAD_REQUEST, HttpMessage.RESET_PASSWORD_ERROR));
            }

            user.password = req.body.password;
            user.password_token = "";
            await user.save()

            return res.status(200).json({ message: "password has been reset" });

        } catch (error: any) {
            // if token is tempered or expired or any other error
            return next(new HttpException(HttpCode.UNAUTHORIZED, "Invalid or Expired token"));
        }
    };




    /**
  * change password 
  * @param req
  * @param res
  * @param next
  */
    public changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            let { error } = await changePasswordValidation(req.body);
            if (error) {
                console.log(error)
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error}` || "Bad Request"));
            }
            let user: IUser | null = await userModel.findById({ _id: req.user._id });
            const comparePassword = await user?.matchPassword(req.body.previousPassword);
            if (!comparePassword) {
                return next(new HttpException(HttpCode.UNAUTHORIZED, `invalid previous Password`));
            }

            if (user) {
                user.password = req.body.newPassword;
                await user.save();
            }

            return res.status(200).json({ message: "password has been changed" });

        } catch (error: any) {

            return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, error.message || HttpMessage.INTERNAL_SERVER_ERROR));
        }
    };
    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params

        if (!userId) {
            return next(new HttpException(HttpCode.BAD_REQUEST, 'user Id must be given as params'))
        }
        let user = await this.service.updateUserProfile(userId, req.body)
        res.status(201).json({
            ...user
        })

    }




}

export default UserController;
