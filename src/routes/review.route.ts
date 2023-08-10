import { Router } from 'express';
import ReviewController from '../controllers/review.controller';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';


const ReviewRoute = Router();
const controller = new ReviewController();

/** 
 * create a review
 * user can perform this action
 * 
 */
ReviewRoute.post("/", verifyUser, controller.create);
/** 
 * Get all reviews
 * Admin can perform this action
 * 
 */
ReviewRoute.get("/", verifyAdmin, controller.getAll);
/** 
 * Get all reviews
 * Admin can perform this action
 * 
 */
ReviewRoute.get("/search", verifyAdmin, controller.search);

/** 
 * Delete a review
 * user can perform this action
 * 
 */
ReviewRoute.delete("/", verifyUser, controller.delete);













export default ReviewRoute;