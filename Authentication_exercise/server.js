const mongoose = require("mongoose");
const express = require("express");
const bcrypt=require("bcrypt");
const app = express();
const jwt=require("jsonwebtoken");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const connectDB = require("./mongoConnection");
const User=require("./Models/userModel");
require("./authentication/google-auth");
require("./authentication/facebook-auth");
require("./authentication/github-auth");
const cookieParser = require('cookie-parser');
const auth=require("./Middlewares/auth");
require("dotenv").config();
console.log(process.env.GOOGLE_CLIENT);
connectDB();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}


app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    name: "authenticationAPP",
    keys: ['key1', 'key2']
}));
console.log("inserver");
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.render("login")
});

app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/registerNewUser",async (req,res)=>{
    console.log(req.body);
    let user;   
    try{

    
    user=await User.findOne({"email":req.body.email});
    
    }
    catch(err){
        console.log(err);
        res.status(500).redirect("/register");
    }
    if (user) return res.status(400).redirect("/register");
    else{
    let user=new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    }) 
    const salt =await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    
        res.redirect("/");
    }
})
app.post("/checkLogin",async (req,res)=>{
    console.log("in login")
    console.log(req.body);
    try{

    
    const user=await User.findOne({"email":req.body.email});
    console.log(user);
    const result=bcrypt.compare(req.body.password,user.password);
    
    if (user) {
        result.then((exists)=>{
            if (exists){
                const token=jwt.sign({_id:user._id},process.env.JWT_PRIVATE_KEY);
    
    res.cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // set to true if your using https
        httpOnly: true,
      });
                res.status(200).redirect("/dashboardForUser");   
            }
            else{
                res.status(400).redirect("/");
            }
        })
    }
    else{
        res.status(400).redirect("/");
    }
}
    catch(err){
        console.log(err);
        res.status(400).redirect("/");
    }
    
})
app.get("/dashboardForUser",auth ,async (req,res)=>{
    try{
    const result=await User.findOne({_id:req.user._id});
        console.log(result);
    res.render("dashboard",{ name: result.username,email: result.email});
    }
    catch(err){

    }
})
app.get("/dashboard", isLoggedIn, (req, res) => {
    console.log("req.user");
    console.log(req.user);
    res.render("dashboard", { name: req.user.displayName });
})
app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['profile', 'email']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }));

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });
app.get("/logout", (req, res) => {
    req.logOut();
    
    req.session=null;
    res.clearCookie('token');
    res.redirect("/");
   
})
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error listening to the port " + PORT);
    }
    else {
        console.log("Listening on port " + PORT);
    }

});