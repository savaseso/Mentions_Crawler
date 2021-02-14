const Mention = require("../models/mention/mention.schema");


const  newMention = async (id, platform, author, company,text,img,popularity,created) =>{
     await new Mention({
        id,
        platform,
        author,
        company,
        text,
        img,
        popularity,
        created,
      }).save().catch(err => console.log(err));  
}


module.exports = newMention