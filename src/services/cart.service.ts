import mongoose from 'mongoose';
import { HttpMessage } from '../exceptions/errorMessages';
import cartModel from '../models/cart.model';
import productModel from '../models/product.model';


/**
 *
 *
 * @export
 * @class CartService
 */
export default class CartService {

    /**
     * Create cart || Add to cart
     * @param data
     */
    public async addTocart(userId: string, productId: string) {

        const product: any = await productModel.findById(productId);
        if (!product) {
            return HttpMessage.NOT_FOUND;
        }
        if (product.quantity_in_stock < 1) {
            return HttpMessage.QUANTITY_OUR_OF_STOCK;
        }

        let cart: any = await cartModel.findOne({ userId: userId });
        let total_items = cart.total_items;

        const existingItem = cart.items.find((item: any) => item.productId.equals(productId));

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.item_subtotal = existingItem.quantity * existingItem.price;
        } else {
            const newItem = {
                productId: product._id,
                title: product.title,
                price: product.price,
                main_image: product.main_image,
                quantity_in_stock: product.quantity_in_stock,
                quantity: 1,
                item_subtotal: 1 * product.price
            };

            cart.items.push(newItem);
        }

        cart.total_items += 1;
        cart.subtotal = cart.items.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);

        // checking if a coupon exists
        let discount = 0;
        if (total_items !== cart.total_items && cart.coupons.length > 0) {
            // remove old discount from cart
            // cart.subtotal += cart.discount;
            for (let i of cart.coupons) {
                console.log("----------->")
                discount = discount + i.discount;
                console.log("======>", discount)

            }
            cart.discount = discount;
            cart.subtotal -= discount;

        }
        await cart.save();

        return cart;
        /*
        const session = await mongoose.startSession();
        session.startTransaction();
      
        try {
          const opts = { session };
      
          const product: any = await productModel.findById(productId).session(session).exec();
          if (!product) {
            session.abortTransaction();
            session.endSession();
            return HttpMessage.NOT_FOUND;
          }
          if (product.quantity_in_stock < 1) {
            session.abortTransaction();
            session.endSession();
            return HttpMessage.QUANTITY_OUR_OF_STOCK;
          }
      
          let cart: any = await cartModel.findOne({ userId: userId }).session(session).exec();
      
          const existingItem = cart.items.find((item: any) => item.productId.equals(productId));
      
          console.log("existing item---------->", existingItem);
      
          if (existingItem) {
            existingItem.quantity += 1;
            existingItem.item_subtotal = existingItem.quantity * existingItem.price;
          } else {
            const newItem = {
              productId: product._id,
              title: product.title,
              price: product.price,
              main_image: product.main_image,
              quantity_in_stock: product.quantity_in_stock,
              quantity: 1,
              item_subtotal: 1 * product.price
            };
      
            cart.items.push(newItem);
          }
      
          cart.total_items += 1;
          cart.subtotal = cart.items.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);
      
          await cart.save(opts);
      
          await session.commitTransaction();
          session.endSession();
      
          return cart;
        } catch (error) {
          console.error('Error adding item to cart:', error);
          session.abortTransaction();
          session.endSession();
          throw error;
        }
        */
    }


    /**
    * Remove from cart cart
    * @param data
    */
    public async removeFromCart(userId: string, productId: string) {

        const cart = await cartModel.findOne({ userId: userId });
        if (!cart) {
            return `${HttpMessage.NOT_FOUND}`;
        }

        const total_items = cart.total_items;
        // checking for item in cart

        // find the index of the item to remove
        const itemIndex = cart.items.findIndex((item: any) => item.productId.equals(productId));
        if (itemIndex === -1) {
            return {
                error: `product ${HttpMessage.NOT_FOUND} in cart!`
            };
        }

        // remove the item from the items array
        const removedItem = cart.items.splice(itemIndex, 1)[0];

        // update the subtotal
        cart.subtotal -= removedItem.quantity * removedItem.price;
        // Update the total_items
        cart.total_items -= removedItem.quantity;

        let discount = 0;
        if (total_items !== cart.total_items && cart.coupons.length > 0) {
            // remove old discount from cart
            cart.subtotal += cart.discount;
            for (let i of cart.coupons) {
                console.log("----------->")
                discount = discount + i.discount;
                console.log("======>", discount)

            }
            cart.discount = discount;
            cart.subtotal -= discount;

        }
        await cart.save();
        return cart;


    }


    /**
     * Get a cart
     * @param 
     */
    public async getCart(userId: string) {
        let cart = await cartModel.findOne({ userId: userId });
        return cart;

    }


    /**
     * update a cart
     * @param id
     */
    public async updateCart(userId: string, productId: string, quantity: number) {
        const cart = await cartModel.findOne({ userId: userId });
        if (!cart) {
            return null;
        }
        let total_items = cart.total_items;
        const itemIndex = cart.items.findIndex((item: any) => item.productId.equals(productId));
        if (itemIndex === -1) {
            return HttpMessage.NOT_FOUND;
        }

        const currentItem = cart.items[itemIndex];
        const currentQuantity = currentItem.quantity;

        // Update the quantity of the item
        currentItem.quantity = quantity;

        // Calculate the change in quantity
        const quantityChange = quantity - currentQuantity;

        // Update the item subtotal
        currentItem.item_subtotal = currentItem.quantity * currentItem.price;

        // Update the subtotal
        cart.subtotal += quantityChange * currentItem.price;

        // Update the total_items
        cart.total_items += quantityChange;

        // Update the cart's discount if there are applied coupons
        let discount = 0;
        if (total_items !== cart.total_items && cart.coupons.length > 0) {
            // remove old discount from cart
            cart.subtotal += cart.discount;
            for (let i of cart.coupons) {
                console.log("----------->")
                discount = discount + i.discount;
                console.log("======>", discount)

            }
            cart.discount = discount;
            cart.subtotal -= discount;

        }

        await cart.save();
        return cart;

    }


    /**
     * delete a cart
     * @param id
     */
    public async deleteCart(userId: string) {
        let cart = await cartModel.findOne({ userId: userId });
        if (!cart) return null;

        cart.items = [];
        cart.total_items = 0;
        cart.subtotal = 0;
        cart.coupon_discount = 0;
        cart.coupons = [];
        await cart.save();
        return cart;
    }


}