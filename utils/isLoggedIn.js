import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config"


export const isLoggedIn = async(req,res,next) =>{
    // console.log(req.cookies);
    if(req.cookies.token){
        try{
           const  data =  jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        //    console.log(data+"huu")
           req.user =await User.findOne({userName:data.userName}).select("-password");
        //    console.log("req.user -----",req.user)
            next();
        }catch(err){
            // res.status(401).send("not authorized");
            res.send(err.message);
        }
    }
    else{
        res.status(401).json({error:"not authorized login kro"})
    }
    
}