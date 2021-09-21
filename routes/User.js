const express=require("express");
const passport = require("passport");
const router=express.Router();
const regModel=require("../model/UserSchema");

//login page
router.get("/login",(req,res)=> res.render ("log"));

//Register page
router.get("/register",(req,res)=> res.render ("reg"));

//register area
router.post("/register",async(req,res)=>{
const {name,email,password,password2}=req.body

//for check to fill req field
if(!name || !email || !password || !password2){
    const  msg= "Plz Fill all req Field" ;
    res.render('reg',{msg})
}
//password Match
if(password !== password2){
    const  msg= "Password dont match";
    res.render('reg',{msg})
}

// check the password length
if(password.length < 6){
    const  msg= "password should be atleast 6 characters"
    res.render('reg',{msg})

}
// check for  email
const  existEmail= await  regModel.findOne({email});
if(existEmail){
    res.render('reg',{msg:"Email  alreday exist "})
}else{
    const addUser= new regModel({
        name,
        email,
        password2,
        password
    });
     addUser.save().then(user=>{
     req.flash("success_msg","you are reg and log in")
     });

    
    res.redirect("/users/login");
}



  

});

// login Handling
router.post("/login",(req,res,next)=>{
    passport.authenticate("local",{
    successRedirect:"/dashbord",
    failureRedirect:"/users/login",
    failureFlash:true
    })(req,res,next);
});
//Logout handling
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success_msg","You are Logout");
    res.redirect("/users/login")
})

module.exports=router;