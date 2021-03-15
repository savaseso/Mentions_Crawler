const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const updateSubscription = require("../functions/updateSubscription");

//updating email,companies, subscription
router.put("/settings", protect, async (req, res, next) => {
  const { email, subscribed } = req.body;

  try {
    await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
      new: true,
      runValidators: true,
    });

    const user = await User.findOne({ email: email });

    if (user) {
      const message = await updateSubscription(subscribed, user);
      res
        .status(200)
        .json({ success: true, message: `Database updated and ${message}` });
    } else {
      res.status(400).json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
