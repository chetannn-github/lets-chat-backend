// import express from "express"
// import http, { Server } from "http";


// const app = express();
// const server = http.createServer(app);

// const io = new Server (server,{
//     cors:{
//         origin:["http://localhost:5173"],
//         methods:["GET","POST"]
//     }
// });

// io.on("connection",(socket)=>{
//     console.log(socket.id);
  
//     socket.on("disconnect",()=>{
//         console.log("user disconnected",socket.id)
//     })
//   })

// export {io,app,server}


import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const userSocketMap = {};

const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin: 'https://lets-chat-frontend.onrender.com',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
    credentials: true,
    sameSite: 'none',
  }  });


export const   getRecieverSocketId  = (recieverId) =>{
return userSocketMap[recieverId]
}



io.on('connection', (socket) => {
  console.log("hii " , socket.id)


     const userId = socket.handshake.query.userId;
    console.log(userId)
    if(userId) {userSocketMap[userId] = socket.id;}

    io.emit("getOnlineUsers",Object.keys(userSocketMap));


    socket.on("disconnect",()=>{
    console.log("disconnected" , socket.id);
    delete userSocketMap[userId];
     io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
  
  
  });




export { io, app, server };


