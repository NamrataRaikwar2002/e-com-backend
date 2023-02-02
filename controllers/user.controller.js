const {User} = require('../models/user.model');

const getUser = async (req, res) => {

    try {
        const {
            userId
        } = req.user;
        const user = await User.findById(userId);
        const {
            password,
            ...userDetails
        } = user._doc;
        res.status(200).json({
            userDetails
        })
    } catch (error) {
        res.status(404).json({
            message: 'Error retrieving user data',
            errorMessage: error.message
        })
    }

}

module.exports = {
    getUser
};