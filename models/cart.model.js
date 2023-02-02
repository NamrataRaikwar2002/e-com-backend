const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    userId: String,
    products: [{
        _id: String,
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = {Cart};