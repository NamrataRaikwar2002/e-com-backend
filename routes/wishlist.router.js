const express = require('express');
const router = express.Router();
const {getProductsInWishlist, addProductInWishlist, deleteProductFromWishlist} = require('../controllers/wishlist.controller');


router.post('/', addProductInWishlist).get('/',getProductsInWishlist)
router.delete('/:productId', deleteProductFromWishlist)
module.exports = router;