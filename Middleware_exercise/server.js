const express = require("express");
const config=require("config");
const PORT = 8000;
const app = express();
const requestLogger=require("./middlewares/requestLogger");
const router=require("./routes/route");
const errorHandler=require("./middlewares/errorHandler");
const pageNotFound=require("./middlewares/pageNotFound");
const corsMiddleware=require("./middlewares/cors");
const bodyParser=require("body-parser");


process.on('uncaughtException',(ex)=>{
  
  console.error("We got an uncaught exception..."+ex.message,ex);
  process.exit(1);
})
process.on('unhandledRejection',(ex)=>{
  console.error("We got an unhandledRejection exception..."+ex.message,ex);
  process.exit(1);
})
//throw new Error("something went wrong");

app.use(corsMiddleware);
app.use(requestLogger);
app.use(bodyParser.json());
app.use("/",router);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});