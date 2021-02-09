const JWT = require('jsonwebtoken')
const User = require('../models/User')


exports.protect = async function(req,res,next) {
    let token;
    const {authorization} = req.headers
    //getting token from the headers
    
    if(authorization && authorization.startsWith('Bearer')){
        token = authorization.split(' ')[1];
    } else if (req.cookies.token){
        token = req.cookies.token
    }

    //make sure token exists
    if(!token){
        return res.status(401).json({success:false, message:"Not authorized to access this route"})
    }

    try {
      //Verify token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized to access this route",
        });
    }
}
