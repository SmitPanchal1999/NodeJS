const jwt=require("jsonwebtoken");

require("dotenv").config();
module.exports=(req,res,next)=>{
    const token = req.cookies.token || "";
    if (!token) return res.status(401).send('access denied ,No token provided');
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).send("Invalid token");
    }
}