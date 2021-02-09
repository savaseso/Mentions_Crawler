const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const fetch = require("node-fetch");
const client = require("../config/twitter");
const uuid = require('uuid');



//getting mentions
router.post("/mentions", protect, async (req, res, next) => {
  const companies = req.user.companies;
  const mentions = [];
  //looping through and making api call with each company
  for (let i = 0; i < companies.length; i++) {
    //REDDIT
    if (req.body.reddit) {
      const response = await fetch(
        `http://www.reddit.com/search.json?q=${companies[i].company}&sort=hot`
      );
      const result = await response.json();
      const data = result.data.children.map((data) => data.data);

      for (let mention of data) {
        let newImageUrl;
        if (mention.preview) {
          newImageUrl = mention.preview.images[0].source.url.replace(
            "amp;s",
            "s"
          );
        } else {
          newImageUrl =
            "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_2560%2Cc_limit/reddit-alien-red-st.jpg";
        }
        console.log(mention)
        mentions.push({
          id: mention.id,
          author: mention.author,
          company: companies[i].company,
          text: mention.title,
          img: newImageUrl,
          created: new Date(mention.created * 1000)
        });
      }
    }

    //TWITTER
    if (req.body.twitter) {
          const data = await client.accountsAndUsers.usersSearch({ q: `${companies[i].company}` });
          for (let mention of data) {
            console.log(mention)
            mentions.push({
              id: mention.id_str,
              author: mention.name,
              company: companies[i].company,
              text: mention.description,
              img: mention.profile_banner_url
              ? mention.profile_banner_url
              : "https://musically.com/wp-content/uploads/2019/02/twitter-logo.jpg",
              created: new Date(mention.created_at),
            });
          }
        }
       
    //NEWS
    if (req.body.news) {    
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${companies[i].company}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
      )
      const result = await response.json();
      for (let mention of result.articles) {
         mentions.push({
          id: uuid.v1(),
          author: mention.author,
          company: companies[i].company,
          text: mention.description,
          img: mention.urlToImage,
          created: mention.publishedAt,
        }); 
     }
    
    }
  }
  res.status(200).json({ success: true, mentions: mentions });

  /* console.log(mentions)
   */
});

module.exports = router;
