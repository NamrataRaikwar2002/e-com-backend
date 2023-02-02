const {Cart} = require('../models/cart.model');

const getAllProductsInCart = async (req, res) => {
    try {

        const {
            userId
        } = req.user;
        const cart = await Cart.findById(userId)
        const cartProducts = cart.products.map((productItem) => {
            return {
                _id:productItem._id,
                quantity: productItem.quantity
            }
        })
        const finalCart = {
            _id: cart._id,
            cart: cartProducts
        };
        res.status(200).json({
            cart: finalCart
        })
    } catch (error) {
        res.status(500).json({
            message: "Couldn't get cart items. Please try again later.",
            errorMessage: error.message
        })
    }
}

const addProductsInCart = async (req, res) => {
        try{
            const {userId} = req.user;
            const {product} = req.body;

            const user = await Cart.findById(userId);
            if(!user){
                const newCart = new Cart({_id:userId, products:{_id:product._id, quantity:1}})
                await newCart.save();
                res.status(200).json({message:"new cart created and product added", newCart})
            }
            else{
                const newProduct ={_id:product._id, quantity:1}
                user.products.push(newProduct);
                await user.save();
                res.status(200).json({message:"Product added to exisitng cart", user})
            }

        }
        catch(error){
            res.json({message:"Error adding product to cart", errorMessage:error.message})
        }
}

const deleteProductFromCart = async(req, res) => {
    try{
        const {userId} = req.user;
        const {productId} = req.params;
        const user = await Cart.findById(userId);
        await user.products.remove(productId);
        await user.save();
        res.status(200).json({user})
    }catch(error){
        res.status(500).json({message:"Error deleting product form cart", errorMessage:error.message})
    }
}

const updateProductInCart = async(req, res) => {
    try{
        let {quantity} = req.body;
        const {userId} = req.user;
        const {productId} = req.params;

        const user = await Cart.findById(userId);
        const product = user.products.map((product) => {
            if(product._id === productId){
                return (product.quantity = quantity)
            }
            return product;
        })
        await user.save();
        res.status(200).json({user})
    }catch(error){
        res.status(500).json({message:"Error updating product", errorMessage:error.message})
    }
}
 
module.exports = {getAllProductsInCart, addProductsInCart, deleteProductFromCart, updateProductInCart}