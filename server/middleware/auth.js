const JWT = require('jsonwebtoken')
const User = require('../models/User')


exports.protect = async function(req,res,next) {
    let token;

    //getting token from the headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token){
        token = req.cookies.token
    }

    //make sure token exists
    if(!token){
        return res.status(401).json({message:"Not authorized to access this route"})
    }

    try {
        //Verify token
        const decoded = JWT.verify(token,process.env.JWT_SECRET)

        console.log(decoded)

        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return res.status(401).json({message:"Not authorized to access this route"})
    }
}
