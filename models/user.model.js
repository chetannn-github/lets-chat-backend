import mongoose from "mongoose";

const userSchema =new  mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    userName:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        minLength:6

    },
    gender:{
        type:String,
        enum:["male", "female"]
    },
    profilePic:{
        type:String,
        default:""
    },
}); 

const User = mongoose.model("User",userSchema);

export default User;