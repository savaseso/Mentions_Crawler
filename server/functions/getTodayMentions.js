const Mention = require("../models/mention/mention.schema");


const getTodayMentionsFromDb = async (platform) =>{
    return await Mention.find({
        platform,
        created: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },})
}


module.exports = getTodayMentionsFromDb