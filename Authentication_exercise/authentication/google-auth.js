const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User=require("../Models/userModel");
const passport=require("passport"); 


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser((user,done)=>{
      //function(id, done) {
 /*   try{
      const result= await User.findById(id);
      console.log("from deserialize");
      console.log(result);
      done(null,result);
   }
   catch(er){
       console.log(er);
       done(er);
   }
   */
  done(null,user);
  });
passport.use(new GoogleStrategy({
    clientID:"943225777196-fqiel9j2j4icuuulp0tak4ahckvdetj5.apps.googleusercontent.com",
    clientSecret: "jIPt2J61r19qdABRLtjm3Eb1",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   /*  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    })  */
    
   /*  let user;
    
    try{
        console.log("in");
     user=await User.findOne({googleId:String(profile.id)});
    }
    catch(err){
        done(err);
    }
    console.log(profile.displayName);
    if (!user){
        const newUser=new User({
            username:String(profile.displayName),
            email:profile.emails[0].value,
            provider:"google",
            googleId:profile.id
        });
        try {
            const result=await newUser.save();
            console.log("from saving the new user.......")
            console.log(result);
            return done(null,result);
        }
        catch(err){
            return done(err);
        }
    } */
    
    return done(null,profile);
  }
));