const Mention = require("./mention.interface");
const fetch = require("node-fetch");
const newMention = require("../../functions/createNewMention");
const getTodayMentionsFromDb = require("../../functions/getTodayMentions.js");

class Reddit extends Mention {

  static async getAllMentions(companies) {
    let todayMentionsFromDb;
    todayMentionsFromDb = await getTodayMentionsFromDb("reddit");
    const dataInDb = 10;
    if (todayMentionsFromDb.length >= dataInDb) {
      return todayMentionsFromDb;
    } else {
      const mentions = await this.retrieveData(companies);
      const redditMentions = await this.mapDataToUniversalFormat(mentions);
      const todayRedditMentions = await this.filterMentions(redditMentions);
      const comparedMentions = await this.compareTodaysMentionsWithDbMentions(
        todayRedditMentions,
        todayMentionsFromDb
      );
      await this.saveAllMentionsToDb(comparedMentions);
      todayMentionsFromDb = await getTodayMentionsFromDb("reddit");
      return todayMentionsFromDb;
    }
  }

  static async retrieveData(companies) {
    const mentions = [];
    for (let i = 0; i < companies.length; i++) {
      try {
        const response = await fetch(
          `http://www.reddit.com/search.json?q=${companies[i].company}&sort=hot`
        );
        const result = await response.json();
        mentions.push({ ...result, company: companies[i].company });
      } catch (err) {
        console.log(err);
      }
    }
    return mentions;
  }

  static async mapDataToUniversalFormat(mentions) {
    const redditMentions = mentions.map((data) => {
      const company = data.company;
      const redditData = data.data;
      return redditData.children.map((data) => {
        const mappedRedditData = data.data
        mappedRedditData.company = company;
        return mappedRedditData;
      });
    });
    return redditMentions;
  }

  static async filterMentions(mentions) {
    return mentions.flat().filter((mention) => {
      const publishedUTC = mention.created * 1000;
      const oneDayUTC = Date.now() - 24 * 60 * 60 * 1000;
      const isLatestDayUTC = publishedUTC > oneDayUTC;
      return isLatestDayUTC;
    });
  }

  static async compareTodaysMentionsWithDbMentions(
    mentions,
    todayMentionsFromDb
  ) {
    return mentions.filter(
      (api) => !todayMentionsFromDb.some((db) => api.id == db.id)
    );
  }

  static getImageUrl(imagePreview) {
    return imagePreview
      ? imagePreview.images[0].source.url.replace("amp;s", "s")
      : "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_2560%2Cc_limit/reddit-alien-red-st.jpg";
  }
  
  static async saveAllMentionsToDb(mentions) {
    for (let mention of mentions) {
      const {
        id,
        author,
        title,
        ups,
        company,
        num_comments,
        created,
        preview,
      } = mention;

      const newImageUrl = this.getImageUrl(preview);

      await newMention(
        id,
        "reddit",
        author,
        company,
        title,
        newImageUrl,
        ups + num_comments,
        new Date(created * 1000)
      );
    }
  }
}

module.exports = Reddit;
