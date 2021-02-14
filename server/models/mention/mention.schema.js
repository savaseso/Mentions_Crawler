const mongoose = require("mongoose");


const MentionSchema = new mongoose.Schema({
  id:String,
  platform:String,
  author: String,
  company: String,
  text:String,
  img:String,
  popularity:Number,
  created: Date,
},{timestamps: true, strict:false});


module.exports = mongoose.model("Mention", MentionSchema);
