const express=require("express");
const app=express();
const treeRouter=require("./routes/treeRoute");
const connectDb=require("./mongoConnection");
const bodyParser=require("body-parser");
connectDb();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})
app.use("/tree",treeRouter);
const PORT =process.env.PORT|| 8080;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error listening to the port " + PORT);
    }
    else {
        console.log("Listening on port " + PORT);
    }

});