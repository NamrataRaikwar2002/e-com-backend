const {
    Wishlist
} = require('../models/wishlist.model');


const getProductsInWishlist = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const user = await Wishlist.findById(userId)
        const {
            products
        } = user;
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving wishlist products",
            errorMessage: error.message
        })
    }
}

const addProductInWishlist = async (req, res) => {
    try {

        const {
            userId
        } = req.user;
        const {
            product
        } = req.body;

        const user = await Wishlist.findById(userId);
        if (!user) {
            const newWishlist = new Wishlist({
                _id: userId,
                products: [{
                    _id: product._id
                }]
            })
            await newWishlist.save()
            res.status(200).json({
                messge: "New wishlist created and product added",
                newWishlist
            })
        } else {
            const newProduct = {
                _id: product._id
            }
            user.products.push(newProduct)
            await user.save()
            res.status(200).json({
                message: "Product added to wishlist",
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding product to wishlist',
            errorMessage: error.message
        })
    }
}

const deleteProductFromWishlist = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const {
            productId
        } = req.params;
        const user = await Wishlist.findById(userId);
        await user.products.remove(productId);
        await user.save();
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            errorMessage: error.message
        })
    }
}
module.exports = {
    getProductsInWishlist,
    addProductInWishlist,
    deleteProductFromWishlist
};