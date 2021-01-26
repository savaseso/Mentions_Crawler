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

    sendTokenResponse(user, 201, res, "Registration was successful");

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login user
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
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

    sendTokenResponse(user, 201, res, "Login was successful");

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get Token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
  
  const token = user.getSignedJwtToken();
  const options = {
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: message, token });
};

module.exports = router;
