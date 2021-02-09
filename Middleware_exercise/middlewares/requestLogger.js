//request logger middleware function
const fs=require("fs");

module.exports = (req, res, next) => { 
    const date = new Date();
    const formatted_date ="Date(dd/mm/yyyy):"+date.getDate() +"/" +(date.getMonth() + 1) +"/" +date.getFullYear() +" Time(hh:mm:ss)- " +date.getHours() +":" +
      date.getMinutes() +":" +date.getSeconds();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    
    
    const log = `[${(formatted_date)}] ${(method)}:${url} StatusCode=${status}`;
    console.log(log);
    fs.appendFile("requests_logs.txt", log + "\n", err => {
      if (err) {
        console.log(err);
      }
    });
    next();
  };