const mongoose = require('mongoose');


const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`MondgoDB connected: ${conn.connection.host}`)
}


module.exports = connectDb