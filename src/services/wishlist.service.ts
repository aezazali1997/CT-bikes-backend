import productModel from '../models/product.model';
import wishlistModel from '../models/wishlist.model';
import { HttpMessage } from '../exceptions/errorMessages';




/**
 *
 *
 * @export
 * @class WishlistService
 */
export default class WishlistService {

    /**
     * Add to Wishlist
     * @param data
     */
    public async addtoWishlist(userId: string, productId: string) {

        const product = await productModel.findById({ _id: productId });
        if (!product) return HttpMessage.NOT_FOUND;

        const wishlist = await wishlistModel.findOneAndUpdate(
            { user: userId },
            { $addToSet: { products: productId } },
            { upsert: true, new: true }
        );
        return wishlist;

    }


    /**
    * Remove from Wishlist
    * @param data
    */
    public async removefromWishlist(userId: string, productId: any) {

        const wishlist = await wishlistModel.findOne({ user: userId });
        if (!wishlist) return HttpMessage.NO_CONTENT;

        const index = wishlist.products.indexOf(productId);

        if (index >= 0) {
            wishlist.products.splice(index, 1);
            await wishlist.save();
            return wishlist;
        } else {
            return HttpMessage.NOT_FOUND;
        }


    }


    /**
     * Get wishlist for a user
     * @param id
     */
    public async getWishlist(query: any, userId: string) {
        const page = Number(query.pageNumber) || 1;
        const pageSize = Number(query.pageSize) || 10;

        let wishlist = await wishlistModel.findOne({ user: userId })
            .populate('products')
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        return wishlist;
    }


    /**
     * Delete user wishlist
     * @param id
     */
    public async deleteWishlist(userId: string) {
        let wishlist = await wishlistModel.findOneAndDelete({ user: userId })
        if (!wishlist) return null;
        return wishlist;

    }



}