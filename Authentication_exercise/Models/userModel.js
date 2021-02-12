const mongoose=require("mongoose");
const userDetails = new mongoose.Schema({
    username: String,
    password: String,
    email:String,
  



})

module.exports=new mongoose.model("user", userDetails);