import "dotenv/config";
import express from "express";
import { connectToDb } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server,io } from "./socket/socket.js";
import axios from "axios"
import cron from "node-cron"
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: 'true',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders:['Content-Type']
};

cron.schedule('*/15 * * * *', () => {
  // Ping your app's URL to keep it active
  axios.get('https://lets-chat-backend-7s3j.onrender.com');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://lets-chat-frontend.onrender.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});



app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)


server.listen(PORT,()=>{
    connectToDb();
    console.log("listening on port " ,PORT)
})