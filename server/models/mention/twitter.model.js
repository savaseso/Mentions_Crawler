const Mention = require("./mention.interface");
const fetch = require("node-fetch");
const newMention = require("../../functions/createNewMention");
const getTodayMentionsFromDb = require("../../functions/getTodayMentions.js");
const client = require("../../config/twitter");

class Twitter extends Mention {

  static async getAllMentions(companies) {
    let todayMentionsFromDb;
    todayMentionsFromDb = await getTodayMentionsFromDb("twitter");
    const dataInDb = 20;
    if (todayMentionsFromDb.length >= dataInDb) {
      return todayMentionsFromDb;
    } else {
      const mentions = await this.retrieveData(companies);
      const twitterMentions = await this.mapDataToUniversalFormat(mentions);
      const todayTwitterMentions = await this.filterMentions(twitterMentions);
      const comparedMentions = await this.compareTodaysMentionsWithDbMentions(
        todayTwitterMentions,
        todayMentionsFromDb
      );
      await this.saveAllMentionsToDb(comparedMentions);
      todayMentionsFromDb = await getTodayMentionsFromDb("twitter");
      return todayMentionsFromDb;
    }
  }

  static async retrieveData(companies) {
    const mentions = [];
    for (let i = 0; i < companies.length; i++) {
      const result = await client.tweets.search({
        q: `${companies[i].company}`,
      });
      mentions.push({ ...result, company: companies[i].company });
    }
    return mentions;
  }

  static async mapDataToUniversalFormat(mentions) {
    return mentions.map((obj) => {
      const company = obj.company;
      return obj.statuses.map((data) => {
        data.company = company;
        return data;
      });
    });
  }

  static async filterMentions(mentions) {
    return mentions.flat().filter((mention) => {
      const publishedUTC = new Date(mention.created_at) * 1000;
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
      ? imagePreview
      : "https://musically.com/wp-content/uploads/2019/02/twitter-logo.jpg";
  }
  
  static async saveAllMentionsToDb(mentions) {
    for (let mention of mentions) {
      const {
        id_str,
        user,
        text,
        retweet_count,
        company,
        favorite_count,
        created_at,
      } = mention;

      const newImageUrl = this.getImageUrl(user.profile_image_url);

      await newMention(
        id_str,
        "twitter",
        user.name,
        company,
        text,
        newImageUrl,
        retweet_count + favorite_count,
        new Date(created_at)
      );
    }
  }
}

module.exports = Twitter;
