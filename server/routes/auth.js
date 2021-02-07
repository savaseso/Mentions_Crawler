const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {protect} = require("../middleware/auth")
//register user
router.post("/register", async (req, res, next) => {
  const { email, companies, password } = req.body;
  try {
    const user = await User.create({
      email,
      companies,
      password,
    });

    sendTokenResponse(user, 201, res, "true");

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

    sendTokenResponse(user, 201, res, "true");

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//logout user
router.post("/logout", async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token")
    /* .cookie("token", '', options) */
});

//check if user is authenticated
router.get("/isUserAuth", protect, async (req, res, next) => {
  const user = req.user
  try {
    res.status(200).json({success:true, data:user})
  } catch (err) {
    res.status(400).json({message:err})
  }
});

//Get Token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {

  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: false
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: message, token }); 
};

module.exports = router;
