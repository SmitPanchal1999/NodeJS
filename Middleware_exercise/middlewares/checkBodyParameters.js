module.exports= (req,res,next)=>{
    const properties=["productName","productId"];
    let flag=0;
    for(let i=0;i<properties.length;i++){
        if (!req.body.hasOwnProperty(properties[i])){
            console.log("hellogh");
            flag=1;
            break;
        }
    }
    if (flag==1){
        const err=new Error("Bad Request");
            err.status=400;
            next(err);
    }
    else{
        next();

    }
}