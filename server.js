import "dotenv/config";
import express from "express";
import { connectToDb } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/auth",authRoutes);



app.listen(PORT,()=>{
    connectToDb();
    console.log("listening on port " ,PORT)
})