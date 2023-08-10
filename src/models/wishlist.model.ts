import mongoose, { model } from 'mongoose';


const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }]
});

const wishlistModel = model('Wishlist', wishlistSchema);
export default wishlistModel;