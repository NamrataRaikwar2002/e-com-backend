const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const wishlistSchema = new Schema({
    userId: String,
    products: [{
        _id: String
    }]

})

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = {
    Wishlist
};