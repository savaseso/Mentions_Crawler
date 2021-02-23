const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const EmailQueue = require("../services/Email");

router.post("/report/:email", protect, async (req, res, next) => {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (user) {
      if (req.body.subscribe) {
        EmailQueue.add(user, { repeat: { every: 36000, jobId: user._id } }); //for test purposes every 36second
        res.status(200).json({
          success: true,
          message: "Succesfully subscribed for weekly email",
        });
      } else {
        EmailQueue.getRepeatableJobs().then((jobs) => {
          console.log(user._id)
          for (let job of jobs) {
            if (job.id == user._id) {
              EmailQueue.removeRepeatableByKey(job.key);
            }
          }
        });
        res.status(200).json({
          success: true,
          message: "Succesfully unsubscribed for weekly email",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "User doesn't exists" });
    }
  });
});

module.exports = router;
