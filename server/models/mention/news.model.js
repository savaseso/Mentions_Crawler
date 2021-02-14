const Mention = require("./mention.interface");
const fetch = require("node-fetch");
const newMention = require("../../functions/createNewMention");
const getTodayMentionsFromDb = require("../../functions/getTodayMentions.js");
const uuid = require("uuid");

class News extends Mention {
  static async getAllMentions(companies) {
    let todayMentionsFromDb;
    todayMentionsFromDb = await getTodayMentionsFromDb("news");
    const dataInDb = 20;
    if (todayMentionsFromDb.length >= dataInDb) {
      return todayMentionsFromDb;
    } else {
      const mentions = await this.retrieveData(companies);
      const NewsMentions = await this.mapDataToUniversalFormat(mentions);
      const todayNewsMentions = await this.filterMentions(NewsMentions);
      const comparedMentions = await this.compareTodaysMentionsWithDbMentions(
        todayNewsMentions,
        todayMentionsFromDb
      );
      await this.saveAllMentionsToDb(comparedMentions);
      todayMentionsFromDb = await getTodayMentionsFromDb("news");
      return todayMentionsFromDb;
    }
  }
  static async retrieveData(companies) {
    const mentions = [];
    for (let i = 0; i < companies.length; i++) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${companies[i].company}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
      );
      const result = await response.json();
      mentions.push({ ...result, company: companies[i].company });
    }
    return mentions;
  }
  static async mapDataToUniversalFormat(mentions) {
    return mentions.map((news) => {
      const company = news.company;
      return news.articles.map((article) => {
        article.company = company;
        return article;
      });
    });
  }
  static async filterMentions(mentions) {

    return mentions
      .flat()
      .filter(
        (mention) =>{
          const publishedUTC =  new Date(mention.publishedAt)* 1000
          const oneDayUTC = (Date.now() - 24 * 60 * 60 * 1000) * 1000
          const isLatestDayUTC = publishedUTC > oneDayUTC;
          return isLatestDayUTC
        });
  }
  static async compareTodaysMentionsWithDbMentions(
    mentions,
    todayMentionsFromDb
  ) {
    return mentions.filter(
      (api) => !todayMentionsFromDb.some((db) => api.title == db.text)
    );
  }
  static getImageUrl(urlToImage) {
    return urlToImage
      ? urlToImage
      : "https://www.dailynews.com/wp-content/uploads/2017/09/img_3776.jpg";
  }
  static async saveAllMentionsToDb(mentions) {
    for (let mention of mentions) {
      const { author, title, company, urlToImage, publishedAt } = mention;
      if (urlToImage === "undefined") {
      }
      const newImageUrl = this.getImageUrl(urlToImage);
      await newMention(
        uuid.v1(),
        "news",
        author,
        company,
        title,
        newImageUrl,
        1,
        publishedAt
      );
    }
  }
}

module.exports = News;
