const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth")
const User = require("../models/User");



//get user data 
router.get("/userData", protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({success:true,data:user})
    } catch (err) {
        res.status(400).json({success:false,error:err.message})
    }
   });
  

  module.exports = router;