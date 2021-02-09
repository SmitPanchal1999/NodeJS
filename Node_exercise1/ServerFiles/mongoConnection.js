const mongoose = require("mongoose");


const connectDb=async ()=>{
    try{
    await mongoose.connect("mongodb+srv://luci:luci@cluster0.oedne.mongodb.net/nodeExercises?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Successfully connected to mongodb");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connectDb;