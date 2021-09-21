const LocalStrategy = require("passport-local").Strategy;
const mongoose= require("mongoose");
const bcrypt =require("bcryptjs");


// import User Model
const User=require("../model/UserSchema");


module.exports= function(passport){
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,password,done)=>{
        User.findOne({email:email})
        .then(user=>{
            if(!user){
                return done(null,false,{ message:"This Email is not Reg"})
            }

        // Password Matching
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if (isMatch) {
                return done( null, user)
            } else {
               return done( null , false,{ message:"Incorrect Password "}) 
            }

        })
            
        })
        .catch(err=> console.log(err));
        })
    );
    //User Serilize and DeSerilize
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id,(err, user)=> {
          done(err, user);
        });
      });


}