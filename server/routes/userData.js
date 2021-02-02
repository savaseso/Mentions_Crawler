const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth")
const User = require("../models/User");



//get user data 
router.get("/userData", protect, async (req, res, next) => {
    const user = await User.findById(req.id)
    res.status(200).json({success:true,data:user})
    
   });
  

  module.exports = router;