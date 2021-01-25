const mongoose = require('mongoose');


const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        })
        console.log(`MondgoDB connected: ${conn.connection.host}`)
    }
    catch (err){
        console.log(err.message)
    }
}


module.exports = connectDb