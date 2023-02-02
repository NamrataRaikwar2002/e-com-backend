const mongoose = require('mongoose')

const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('succesfully connected')
    } catch (err) {
        console.log(err)
    }
}


module.exports = {connectToDatabase};