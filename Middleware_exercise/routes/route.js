const express = require("express");
const router = express.Router();
const restrictJsonContentType=require("../middlewares/restrictJsonContentType");
const jwt=require("jsonwebtoken");
const userValidate=require("../middlewares/userValidate");
const checkBodyParams=require("../middlewares/checkBodyParameters");
const auth=require("../middlewares/auth");
require("dotenv").config();
router.get("/", (req, res) => {
  // throw new Error("Get request");
    
    res.status(400).json({error: 'Bad request'});
    
});
router.get("/users", (req, res) => {
    res.send("This are the users");
});
router.post("/addUser",userValidate, (req, res) => {
    
    //for authentication we can uncomment this lines   
    const token=jwt.sign({username:req.body.username},process.env.JWT_PRIVATE_KEY);
  res.send(token);
  //  res.send("add user");

});
router.post("/addProduct",restrictJsonContentType(),checkBodyParams,(req, res) => {

    res.send("add product");
})
router.get("/getProduct",auth,(req,res)=>{
    res.send("get product");
})
router.delete("/removeUser", (req, res) => {
    res.send("delete user");
});

module.exports=router;