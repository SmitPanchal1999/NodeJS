const mongoose=require("mongoose");
const userDetails = new mongoose.Schema({
    firstName: String,
    lastname: String
})

module.exports=new mongoose.model("renderrow", userDetails);