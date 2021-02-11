const mongoose = require("mongoose");


const connectDb=async ()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/nodeExam", { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Successfully connected to mongodb");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connectDb;