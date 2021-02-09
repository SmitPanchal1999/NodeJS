const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const userModel = require("../Models/userModel");
const renderModel = require("../Models/renderStaticData");
const bodyParser = require("body-parser");


app.set('view engine', 'ejs');


router.get("/renderData", async (req, res) => {
    const result = await renderModel.find();
    console.log(result);
    res.send(result);
});


router.get("/getData", async (req, res) => {
    const result = await userModel.find();
    console.log(result);
    res.json(result);

});
router.delete("/delete",bodyParser.json(),async (req,res)=>{
    console.log(req.body);
    if (req.body == undefined) {
        console.log("undefined");

        res.json({ result: "undefined" });
    }
    try {
        const result=await userModel.deleteOne({firstName:req.body.firstName,lastName:req.body.lastName});
        console.log(result);
        res.json({result:"good"});
        
    }
    catch(err){
        console.log(err);
    }

});
router.put("/update",bodyParser.json(), async (req, res) => {
    console.log(req.body);
    if (req.body == undefined) {
        console.log("undefined");

        res.json({ result: "undefined" });
    }
    try {
        const user = await userModel.updateOne({ "firstName": { $regex: new RegExp("^"+req.body.oldFirstName+"$", "i") }, "lastName": { $regex: new RegExp("^"+req.body.oldLastName+"$", "i") } },
          {  $set:{
                firstName:req.body.newFirstName,
                lastName:req.body.newLastName
            }
          }
        );
        console.log(user);
        res.json({ result: "good" });
    }
    catch (err) {
        console.log(err);
        res.json({ result: "error" });
    }
    

})



//add new row
router.post("/addNew", bodyParser.json(), async (req, res) => {

    console.log(req.body);
    if (req.body == undefined) {
        console.log("undefined");

        res.json({ result: "undefined" });
    }
    let user;
    try {
         user = await userModel.findOne({ "firstName": { $regex: new RegExp("^"+req.body.firstName+"$", "i") }, "lastName": { $regex: new RegExp("^"+req.body.lastName+"$", "i") } });
        console.log("find " + user);
    }
    catch (err) {
        console.log(err);
    }
    if (user == null) {
        try {
            const newUser=new userModel({
                firstName:req.body.firstName,
                lastName:req.body.lastName
            })
            const result = await newUser.save();
            console.log(result);

            res.json({ result: "good" });
        }
        catch (err) {
            console.log(err);
            res.json({ result: "error" });

        }
       

    }
    else {
        res.json({ result: "exists" });;
    }

    /* if (flag==0){

    
   
    try{
    const result=await newUser.save();
    console.log(result);
    
    res.json({result:"good"});
    }
    catch(err){
        console.log(err);
        res.json({result:"error"});
    
    }
    }
    else{
        res.json({result:"exists"});
    } */
})
module.exports = router;