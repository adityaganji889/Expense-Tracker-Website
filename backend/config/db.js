const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL,{useNewURLParser: true, useUnifiedTopology: true});

const connectionDb = mongoose.connection;

connectionDb.on('connected',()=>{
    console.log("Connected to database successfully.");
})

connectionDb.on('error',(e)=>{
    console.log(e);
})


module.exports = connectionDb;