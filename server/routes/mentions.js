const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Reddit = require("../models/mention/reddit.model");
const Twitter = require("../models/mention/twitter.model");
const News = require("../models/mention/news.model");

//getting mentions
router.post("/mentions", protect, async (req, res, next) => {
  const companies = req.user.companies;
  const { reddit, twitter, news } = req.body;
  const allMentions = [];

  //REDDIT
  if (reddit) {
    const redditMentions = await Reddit.getAllMentions(companies);
    allMentions.push(...redditMentions);
  }

  //TWITTER
  if (twitter) {
    const twitterMentions = await Twitter.getAllMentions(companies);
    allMentions.push(...twitterMentions);
  }

  //NEWS
  if (news) {
    const newsMentions = await News.getAllMentions(companies);
    allMentions.push(...newsMentions);
  }
  res.status(200).json({ success: true, mentions: allMentions });
});

module.exports = router;
