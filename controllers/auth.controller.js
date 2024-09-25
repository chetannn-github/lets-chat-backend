import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";


export const signup = async(req,res)=>{
    let {userName,fullName,password,gender,confirmPassword}= req.body;

    if(!userName || !password ||!fullName || !gender || !confirmPassword ){
        return res.status(400).json({error:"please fill all fields"})
    }
    let profilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

    if(password!=confirmPassword){
       return res.status(400).json({error:"Wah bhai, password bhii same nhii likha jaa rhaa 😂"})
    }

    let user = await User.findOne({userName});

    if (user) {
        return res.status(400).json({error:"Arre bhai, username pehle hi booked hai! 😅"})
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password,salt);

    user =new User({fullName,userName,gender,password:hash,profilePic});
    await user.save();

    //login ka code
    let token = generateToken({userName});

    res.cookie("token",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        secure:true,
        sameSite:'none',
        
     })

      res.status(201).json({_id:user._id,userName,profilePic:user.profilePic})
};



export const login = async(req,res)=>{
   let {userName,password} = req.body;

    // console.log(userName,password)

   if(!userName || !password ){
    return res.json({error:"please fill all fields"})
    }

   let user = await User.findOne({userName});

   if(!user){
    return res.json({error:"username or password is wrong"})
   }

   let checkPass = bcrypt.compare(user.password,password);
   if(!checkPass){
    return res.json({error:"username or password is wrong"})
   }

   let token = generateToken({userName});

   res.cookie("token",token,{
    maxAge:1000*60*60*24*30,
    httpOnly:true,
    secure:true,
    sameSite:'none',
   
 })

    res.status(201).json({_id:user._id,userName,profilePic:user.profilePic})

};

export const logout = (req,res)=>{
    res.cookie("token","");
    res.status(400).json({success:"logout hogya hh"})
};
