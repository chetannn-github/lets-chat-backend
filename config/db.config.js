import mongoose from "mongoose";
import  "dotenv/config";

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
 console.log("connected to db")
}

export const  connectToDb = () =>{
    main().catch(err => console.log(err));
}
