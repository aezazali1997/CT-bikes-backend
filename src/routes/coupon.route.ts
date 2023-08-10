import { Router } from 'express';
import CouponController from '../controllers/coupon.controller';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';


const CouponRoute = Router();
const controller = new CouponController();

/** 
 * create a coupon
 * admin can perform this action
 * 
 */
CouponRoute.post("/", verifyAdmin, controller.create);


/* Search a Coupon by code */

CouponRoute.get("/search", verifyAdmin, controller.search);





/** 
 * get a coupon
 *  user can perform this action
 * 
 */
CouponRoute.get("/:id", verifyAdmin, controller.getCoupon);



/** 
 * get all coupon
 * admin can perform this action
 * later we will add authencation layer on this route
 */
CouponRoute.get("/", verifyAdmin, controller.getAllCoupon);



/** 
 * delete a coupon
 * admin can perform this action
 * 
 */
CouponRoute.delete("/:id", verifyAdmin, controller.deleteCoupon);




/** 
 * update a coupon
 * admin can perform this action
 * later we will add authencation layer on this route
 */
CouponRoute.put("/:id", verifyAdmin, controller.updateCoupon);




/** 
 * apply coupon
 * user can perform this action before checkout
 * 
 */
CouponRoute.post("/apply-coupon", verifyUser, controller.applyCoupon);


/** 
 * remove coupon
 * user can perform this action before checkout
 * 
 */
CouponRoute.post("/remove-coupon", verifyUser, controller.removeCoupon);





export default CouponRoute;