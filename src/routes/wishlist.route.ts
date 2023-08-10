import { Router } from 'express';
import WishlistController from '../controllers/wishlist.controller';
import { verifyUser } from '../middlewares/jwt';



const WishlistRoute = Router();
const controller = new WishlistController();

/** 
 * add to wish list
 * user can perform this action
 * 
 */
WishlistRoute.post("/",verifyUser, controller.addtoWishlist);


/** 
 * remove product from wishlist
 * user can perform this action
 * 
 */
WishlistRoute.put("/",verifyUser, controller.removefromWishlist);

/** 
 * get  wishlist of user
 * user can perform this action
 *
 */
WishlistRoute.get("/",verifyUser, controller.getWishlist);

/** 
 * delete/empty user's wishlist
 * user can perform this action
 * 
 */
WishlistRoute.delete("/",verifyUser, controller.deleteWishlist);









export default WishlistRoute;