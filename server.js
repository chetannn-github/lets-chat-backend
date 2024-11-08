import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDb } from "./config/db.config.js";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import cors from "cors"
import { app,server,io } from "./socket/socket.js";
import axios from "axios"

// import job from "./cron/cron.js";

const PORT = process.env.PORT || 3000;

// job.start();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://lets-chat-frontend.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});






// const corsOptions = {
//   origin: (origin, callback) => {
//     if (origin === 'http://localhost:5173' || origin === 'https://chat-react-app-frontend.onrender.com') {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   allowedHeaders: ['Content-Type'],
//   accessControlAllowCredentials: true
// };


app.use(cors({
  origin: 'https://lets-chat-frontend.onrender.com',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true,
  sameSite: 'none',
}));


// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get("/api/test",(req,res)=>{
  res.send("test api to awake server");
})
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)

server.listen(PORT,()=>{
    connectToDb();
    console.log("listening on port " ,PORT)
})
