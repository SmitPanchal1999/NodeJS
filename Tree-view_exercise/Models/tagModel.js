const mongoose=require("mongoose");
const tag = new mongoose.Schema({
    tagName: String,
    parentId:String,
    order:Number



})

module.exports=new mongoose.model("tag", tag);