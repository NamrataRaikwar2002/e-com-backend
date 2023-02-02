const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {

    const token = req.headers.authorization;
    try{
        if(!token){
            res.status(401).json({message:"Unauthorized access! Token is not present!!!"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:decoded.userId}
        next()
    }catch(err){
        return res.status(403).json({message:"Unauthorized access! Token error!!!", errorMessage:err.message});
    }
}

module.exports = {verifyAuth};