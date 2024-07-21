import "dotenv/config";
import express from "express";
import { connectToDb } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
// import { app,server,io } from "./socket/socket.js";
import axios from "axios"
import cron from "node-cron"
const PORT = process.env.PORT || 3000;


const  app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === 'http://localhost:5173' || origin === 'https://chat-react-app-frontend.onrender.com') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type'],
  accessControlAllowCredentials: true
};




app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// cron.schedule('*/15 * * * *', () => {
//   // Ping your app's URL to keep it active
//   axios.get('https://lets-chat-backend-7s3j.onrender.com');
// });




// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://localhost:5173");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.use(cors(corsOptions));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type']
}));




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)


app.listen(PORT,()=>{
    connectToDb();
    console.log("listening on port " ,PORT)
})