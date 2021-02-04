const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth")
const fetch = require('node-fetch');


//getting mentions
router.get("/mentions", protect, async (req, res, next) => {
  console.log(req.user.companies);
  const companies = req.user.companies;
  //looping through the tags and making api call with each company
  const mentions = [];
  for (let i = 0; i < companies.length; i++) {
    let data = await fetch(
      `http://www.reddit.com/search.json?q=${companies[i].company}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data.data.children.map((data) => data.data);
      })
      .catch((err) => console.log(err));
    for (let post of data) {
      let newImageUrl;
      if (post.preview) {
        newImageUrl = post.preview.images[0].source.url.replace("amp;s", "s");
      } else {
        newImageUrl =
          "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_2560%2Cc_limit/reddit-alien-red-st.jpg";
      }
      mentions.push({
        id: post.id,
        title: post.title,
        company: companies[i].company,
        text:post.selftext,
        img: newImageUrl,
      });
    }
  }
  res.status(200).json({ data: mentions });
});
  

  module.exports = router;