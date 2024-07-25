import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

import { getRecieverSocketId, io } from "../socket/socket.js";
export const sendMessage = async(req,res) =>{
  try{
    let recieverId = req.params.id;
    let {message} = req.body;
    let senderId = req.user._id;

    

    let newMessage = new Message({message,senderId,recieverId});
    
    let conversation =await Conversation.findOne({
        participants:{$all:[senderId,recieverId]}
    });

    if(!conversation){
        conversation = new Conversation({
            participants:[senderId,recieverId],
        });
       
    } 
    conversation.messages.push(newMessage._id)
    await newMessage.save();
    await conversation.save();

    // await Promise.all([newMessage.save(),conversation.save()])

    const recieverSocketId = getRecieverSocketId(recieverId);
    
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newmsg",newmsg)
      console.log("msg sent via socket")
    }


    res.json(newMessage)


  }catch(err){
    console.log("error in sending messages" + err.message)
    res.status(500).json({error:"internal server error"})
  }
}

export const getMessages = async(req,res) =>{
    try{
        let recieverId = req.params.id;
        let senderId = req.user._id;
    
        let conversation =await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        }).populate("messages");
    
        
        if(!conversation){
            return res.status(200).json([])
        }
        res.json(conversation.messages)
    
    
      }catch(err){
        console.log("error in getting messages" + err.message)
        res.status(500).json({error:"internal server error"})
      }
}