const express = require('express');
const router = express.Router();
const {getAllProducts, getByProductId} = require('../controllers/product.controller');

router.get('/', getAllProducts)
router.get('/:productId', getByProductId)

module.exports = router;