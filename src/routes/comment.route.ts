import { Router } from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import CommentController from '../controllers/comment.controller';


const CommentRoute = Router();
const controller = new CommentController();

/** 
 * create a comment
 * user can perform this action
 * 
 */
CommentRoute.post("/", verifyUser, controller.create);

/** 
 * get all comments
 * admin can perform this action
 * 
 */
CommentRoute.get("/", verifyAdmin, controller.getallComments);

/** 
 * get a comment
 * any user can perform this action
 * 
 */
CommentRoute.get("/:id", controller.getComment);








export default CommentRoute;