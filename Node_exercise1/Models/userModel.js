const mongoose=require("mongoose");
const userDetails = new mongoose.Schema({
    firstName: String,
    lastName: String
})

module.exports=new mongoose.model("user", userDetails);