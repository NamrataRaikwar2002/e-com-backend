const {User} = require('../models/user.model');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')

const signupUser = async (req, res) => {

        const {
            firstName, 
            lastName,
            email,
            password
        } = req.body;
    
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: CryptoJs.AES.encrypt(password, process.env.SECRET_KEY).toString()
        });
    
        try {
            const user = await User.find({
                email
            })
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User already exists!'
                })
            }
    
            const savedUser = await newUser.save()
            const {
                password,
                ...others
            } = savedUser._doc
            res.status(201).json(others)
        } catch (err) {
            res.status(500).json(err.message)
        }
    
    }


const loginUser = async (req, res) => {
    try {

        const user = await User.findOne({email: req.body.email});
         !user && res.status(401).json('Wrong credentials!');

        const decryptPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJs.enc.Utf8);

        decryptPassword !== req.body.password && res.status(401).json('Wrong credentials!');

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET);
        const {
            password,
            ...others
        } = user._doc;

        res.status(200).json({...others, token});
    } catch (err) {
        res.status(500).json(err)
    }

}


module.exports = {signupUser, loginUser}
