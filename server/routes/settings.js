const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth")
const User = require("../models/User");



//updating email,companies
router.put("/settings", protect, async (req, res, next) => {
    console.log(req.body)
  try {
    await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, message: "Database updated" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
  

  module.exports = router;