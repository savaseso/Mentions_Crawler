const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
  },

  companies: {
    type: [{company:String}],
    required: [true, "Please add a company name"]
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password using bcrypt

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err.message);
  }
});

//Sign JWT and return 
UserSchema.methods.getSignedJwtToken = function (){
 return JWT.sign({id:this._id}, process.env.JWT_SECRET, {
   expiresIn:300
 })
}
//Check if user entered password matches with database
UserSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
 }

module.exports = mongoose.model("User", UserSchema);
