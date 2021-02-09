
const userValidate=async (req,res,next)=>{
    console.log("hello");
    const Joi = require('joi');

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(5).max(30).required()
    });
    try {
        console.log(req.body);
        const value = await schema.validateAsync(req.body);
        next();
    }catch(e){
        console.log(e);
        
        const err=new Error("Bad Request");
        err.status=401;
        next(err);
    }
    
}

module.exports=userValidate;