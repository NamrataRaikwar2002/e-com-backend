const {
    Product
} = require('../models/products.model');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            products
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving products',
            errorMessage: error.message
        })
    }
}

const getByProductId = async (req, res) => {
    const {
        productId
    } = req.params
    try {
        const product = await Product.findById(productId);
        res.json({
            product
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error retrieving product',
            errorMessage: error.message
        })
    }
}

module.exports = {
    getAllProducts,
    getByProductId
};