import couponModel from '../models/coupon.model';
import { HttpMessage } from '../exceptions/errorMessages';
import cartModel from '../models/cart.model';
import { hasDatePassed } from '../utils/coupon.utils'

/**
 *
 *
 * @export
 * @class CouponService
 */
export default class CouponService {

    /**
     * Create a new coupon
     * @param data
     */
    public async create(data: any) {

        let coupon = await couponModel.findOne({
            $or: [
                { code: data.code },
                { name: data.name }
            ]
        });
        if (coupon) return null;

        coupon = await couponModel.create({ ...data });
        return coupon;

    }



    /**
     * Get  coupon
     * @param data
     */
    public async getCoupon(id: string) {

        let coupon = await couponModel.findById({ _id: id });
        if (!coupon) return null;

        return coupon;

    }



    /**
   * Get all coupons
   * @param data
   */
    public async getAllCoupon(query: any) {

        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 50; // the total number of entries on a single page
        let coupons = await couponModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        coupons = coupons.map((coupon: any) => {

            coupon.status = !hasDatePassed(coupon.expirationTime)
            return coupon
        })
        console.log('coupon after update ----', coupons)
        return coupons

    }



    /**
        * Delete a coupon
        * @param data
        */
    public async deleteCoupon(id: string) {
        let coupon = await couponModel.findByIdAndDelete({ _id: id })
        return coupon;

    }



    /**
         * Update a coupon
         * @param data
         */
    public async updateCoupon(id: string, code: string, discount: number, expirationTime: any, name: string) {
        let coupon = await couponModel.findById({ _id: id })
        if (!coupon) return null;

        coupon.code = code || coupon.code;
        coupon.name = name || coupon.name;
        coupon.discount = discount || coupon.discount;
        coupon.expirationTime = expirationTime || coupon.expirationTime;
        await coupon.save();
        return coupon;

    }



    /**
         * Apply coupon
         * @param data
         */
    public async applyCoupon(code: string, userId: string) {
        //find the coupon

        let discount = 0;
        let coupon = await couponModel.findOne({ code: code })
        if (!coupon) return null;

        // finding cart
        let cart = await cartModel.findOne({ userId: userId });
        if (!cart) return HttpMessage.NOT_FOUND;

        if (cart.items.length <= 0) return HttpMessage.BAD_REQUEST;

        // Check if the coupon is expired
        const currentDate = new Date();
        if (coupon.expirationTime < currentDate) {
            return HttpMessage.EXPIRED;
        }

        // If the coupon exists, check if the user has already used it
        if (coupon) {
            const userHasUsed = coupon.usersUsed.includes(userId);
            if (userHasUsed) return HttpMessage.ALREADY_USED;
            // here i want to check if it is expired
            discount = coupon.discount;
            coupon.usersUsed.push(userId);
            await coupon.save();

        }


        // Calculate the total price
        //   cart.subtotal = cart.items.reduce((acc: any, item: any) => acc + item.price, 0) - discount;
        cart.subtotal -= discount;
        cart.coupons.push({ code: coupon.code, discount: coupon.discount, name: coupon.name });
        cart.discount += discount
        await cart.save();
        // Return the total price and discount to the client
        return cart;

    }


    /**
         * Remove coupon
         * @param data
         */
    public async removeCoupon(code: string, userId: string) {
        //find the coupon
        let coupon = await couponModel.findOne({ code: code })
        if (!coupon) return null;

        // Remove the user reference from the coupon
        coupon.usersUsed = coupon.usersUsed.filter((user: any) => user.toString() !== userId.toString());
        await coupon.save();



        // Find the cart
        let cart = await cartModel.findOne({ userId: userId });
        if (!cart) return HttpMessage.NOT_FOUND;
        if (!cart.coupons.some((coupon: any) => coupon.code == code))
            return HttpMessage.BAD_REQUEST;

        // Calculate the new total price
        cart.subtotal += coupon.discount;
        cart.discount -= coupon.discount;
        cart.coupons = cart.coupons.filter((coupon: any) => coupon.code !== code);
        await cart.save();
        // Return the total price and discount to the client
        return cart;

    }
    search = async (query: any) => {
        const { code } = query;
        const page = Number(query.pageNumber) || 1;
        const pageSize = Number(query.pageSize) || 10;


        return await couponModel.find({
            code: {
                $regex: `${code}*`
            }
        })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

    }



}