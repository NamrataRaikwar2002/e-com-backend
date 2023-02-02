const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.router')
const { connectToDatabase } = require('./db/db.connect');
const { verifyAuth } = require('./middlewares/verifyAuth');
const cors = require("cors");
const {addProductsToCollection} = require('./models/products.model');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const cartRouter = require('./routes/cart.router');
const wishlistRouter = require('./routes/wishlist.router');
dotenv.config()

mongoose.set('strictQuery', false);
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

connectToDatabase()

// Ran once when products need to save in db
// addProductsToCollection()


app.get('/', (req, res) => {
    res.send('hello world!')
})

app.use('/api/auth', authRouter)
app.use('/products', productRouter)

app.use(verifyAuth)
app.use('/cart', cartRouter);
app.use('/user',userRouter);
app.use('/wishlist', wishlistRouter);

app.use((req, res) =>{
    res.status(404).json({message:"Route doesn't exist!"})
})

app.use((err,req,res) => {
    res.status(500).json({message:"Error occured on server side!", errorMessage:error.message}) 

})


app.listen(3000)
