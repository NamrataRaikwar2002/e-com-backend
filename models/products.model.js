const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const {
    products
} = require('./product.data')


const productSchema = new Schema({
    productImg: String,
    title: String,
    price: String,
    prePrice: String,
    discount: String,
    rating: String,
    category: String,
    quantity: Number,
})

const Product = mongoose.model('Product', productSchema);

const newProduct = new Product(products)
const addProductsToCollection = async () => {
    try {
        products.forEach(async (product) => {
            const newProduct = new Product(product)
            await newProduct.save()
        })
    } catch (error) {
        console.log('error not adding products', error)
    }
}

module.exports = {
    Product,
    addProductsToCollection
};