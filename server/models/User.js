const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true, 'Please add an email'],
        unique:true,
        match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please add a valid email']
    },

    company:{
        type: String,
        required: [true, 'Please add a company name']
    },

    password:{
        type:String,
        required:[true, 'Please add a password'],
        minlength:6,
        select:false
    }
})


module.exports = mongoose.model('User',UserSchema)