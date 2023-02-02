const express = require('express');
const router = express.Router();
const {getAllProductsInCart, addProductsInCart,deleteProductFromCart, updateProductInCart} = require('../controllers/cart.controller');

router.get('/', getAllProductsInCart)
.post('/', addProductsInCart);

router.delete('/:productId', deleteProductFromCart)
.post('/:productId', updateProductInCart)

module.exports = router;