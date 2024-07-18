import User from "../models/user.model.js"


export const getAllUsers = async(req,res) =>{
    try{
        let loggedInUserId = req.user._id
        let allUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(201).json(allUsers)

    }catch(err){
        console.log(err.message)
            res.status(500).json({error:"error in finding users"})
    }
}