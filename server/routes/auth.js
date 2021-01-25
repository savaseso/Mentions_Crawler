const express = require("express");
const router = express.Router();
const User = require("../models/User");

//register user
router.post("/register", async (req, res, next) => {
  const { email, company, password } = req.body;
  try {
    const user = await User.create({
      email,
      company,
      password,
    });
    if(user){
        res.status(200).json({message:"Registration was successful"})
    }
  } catch (err) {
      res.status(400).json({message:err.message})
  }
});

//login user
router.get("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email)
    const user = await User.findOne({email}).select('+password')
    console.log(user)
});

module.exports = router;
