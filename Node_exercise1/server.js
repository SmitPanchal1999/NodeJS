const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDb=require("./ServerFiles/mongoConnection.js");

const path = require('path');
const tableRoute=require("./routes/tableRoutes");

connectDb();
app.use(express.static(__dirname));

app.set('view engine','ejs');
app.use("/table",tableRoute);
app.get("/",(req,res)=>{
    res.render("index");
})


const PORT = 8080;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error listening to the port " + PORT);
    }
    else {
        console.log("Listening on port " + PORT);
    }

});