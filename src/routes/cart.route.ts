import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { verifyUser } from '../middlewares/jwt';


const CartRoute = Router();
const controller = new CartController();

/** 
 * create a cart
 * user can perform this action
 * 
 */
CartRoute.post("/",verifyUser, controller.addTocart);

/** 
 * remove from cart
 * user can perform this action
 * 
 */
CartRoute.patch("/remove-item/:productId",verifyUser, controller.removeFromCart);


/** 
 * get a cart
 * user can get his/her own cart
 * 
 */
CartRoute.get("/",verifyUser, controller.getCart);

/** 
 * delete a cart
 * user can delete/empty his/here  cart
 * 
 */
CartRoute.delete("/",verifyUser, controller.deleteCart);

/** 
 * update a cart
 * increase or decrease item quantity 
 * 
 */
CartRoute.patch("/",verifyUser, controller.updateCart);








export default CartRoute;