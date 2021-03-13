const Mention = require("../models/mention/mention.schema");

const getTodayMentionsFromDb = async (platform, userCompanies) => {
    const companies = userCompanies.map((company) => company.company);
  return await Mention.find({
    company: { $in: companies },
    platform,
    created: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });
};

module.exports = getTodayMentionsFromDb;
