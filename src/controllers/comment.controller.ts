import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import CommentService from '../services/comment.service';
import { createComment } from '../validator/comment';


class CommentController {
    service = new CommentService();


    /**
     * Create a new comment
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

            const { error } = await createComment(req.body);
            if (error) {
                return next(new HttpException(HttpCode.BAD_REQUEST, `${error.message}` || "Bad Request"));
            }

            await this.service.create(req.body);
            return res.json({
                message: `${HttpMessage.CREATED}`,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


    /**
     * Get all comments
     * @param req
     * @param res
     * @param next
     */
    public getallComments = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const comments = await this.service.getallComments(req.query);
            return res.json({
                message: "all comments",
                comments: comments,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };


    /**
     * Get a comment
     * @param req
     * @param res
     * @param next
     */
    public getComment = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const comment = await this.service.getComment(req.params.id);
            if (!comment) {
                return next(new HttpException(HttpCode.NOT_FOUND, `comment ${HttpMessage.NOT_FOUND}`));
            }
            return res.json({
                message: "comment",
                comment: comment,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR}` })
            // next(error);
        }
    };




}

export default CommentController;
