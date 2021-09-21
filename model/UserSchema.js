const mongoose=require("mongoose");
const bcrypt =require("bcryptjs");

//db connection
mongoose.connect("mongodb://localhost:27017/login",{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true,
useFindAndModify:false
}).then(()=>console.log("db is connected...."))
.catch((err)=>console.log(err));

//schema section
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        required:true
    },

    date:{
        type:Date,
    default:Date.now
    }

});

//hash password
userSchema.pre("save",async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass= await bcrypt.hash(this.password,salt);
        this.password=hashpass;

    } catch (error) {
        console.log(error);
    }
   

})
const User=new mongoose.model("logcollection",userSchema);
module.exports=User;
