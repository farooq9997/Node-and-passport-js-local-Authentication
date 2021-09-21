const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
const expressLayouts=require("express-ejs-layouts");
const flash=require("connect-flash");
const session =require("express-session");
const passport = require("passport")

//passport import
require("./passport-local/passport")(passport);
//EJS TAMPLATE ENGINE
app.use(expressLayouts);
app.set("view engine","ejs")
//form json data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//express-session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

//passport initialixation
app.use(passport.initialize());
app.use(passport.session());

//connect-flash
app.use(flash());
//global var
app.use((req,res,next)=>{
  res.locals.success_msg= req.flash("success_msg");
  res.locals.error_msg= req.flash("error_msg");
  next();

})

//ROUTES
app.use("/",require("./routes/index"));
app.use("/users",require("./routes/User"));


app.listen(PORT, () => {
  console.log(`Server  Started  on Port:${PORT}`)
})