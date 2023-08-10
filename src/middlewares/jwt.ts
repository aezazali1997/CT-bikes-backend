import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import User from '../models/user.model';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import { UserRole } from '../types/user';
import HttpException from '../exceptions/HttpException';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return next(new HttpException(HttpCode.FORBIDDEN, `A token is required for authentication`));
        }

        const decoded: any = jwt.verify(token, String(JWT_SECRET_KEY));
        const user = await User.findById({ _id: decoded?.id }).select('-password');
        if (!user) {
            return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
        }
        req.user = user;
        return next();
    } catch (err) {
        return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
    }


};



export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return next(new HttpException(HttpCode.FORBIDDEN, `A token is required for authentication`));
        }

        const decoded: any = jwt.verify(token, String(JWT_SECRET_KEY));
        const user = await User.findById({ _id: decoded?.id }).select('-password');

        // Check if the user has an admin role
        if (!user) {
            // return res.status(HttpCode.UNAUTHORIZED).json({ message: HttpMessage.ACCESS_DENIED });
            return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
        }
        if (user?.role !== UserRole.Admin) {
            return next(new HttpException(HttpCode.FORBIDDEN, HttpMessage.ACCESS_DENIED));
        }
        return next();
    } catch (err) {
        return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
    }


};


export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (token) {
            const decoded: any = jwt.verify(token, String(JWT_SECRET_KEY));
            const user = await User.findById({ _id: decoded?.id }).select('-password');
            if (!user) {
                return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
            }
            req.user = user;
        }
        return next();
    } catch (err) {
        return next(new HttpException(HttpCode.UNAUTHORIZED, HttpMessage.UNAUTHORIZED));
    }


};

