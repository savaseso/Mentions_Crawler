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

    //create token
    const token = user.getSignedJwtToken();

    if (user) {
      res.status(201).json({ message: "Registration was successful", token });
    }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login user
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try{
     //valid email or password
  if (!email || !password) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  //check for user
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  
  const token = user.getSignedJwtToken();

  res.status(201).json({ message: "Login was successful", token });

  }
  catch (err){
    res.status(400).json({ message: err.message });
  }
 
});

module.exports = router;
