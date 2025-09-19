import mongoose from "mongoose"
import dotenv from 'dotenv'
// import Question from "../models/question";

dotenv.config()


export const connectDB = async () => {
    try {
        if (process.env.MONGO_URI){
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`)
        }
    }catch(error){
        console.error(`Error : ${error?.message}`);
        process.exit(1); // 1 means fail 0 means success
    }
} 




