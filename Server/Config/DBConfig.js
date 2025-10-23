import mongoose from "mongoose";
import  dotenv from "dotenv";
dotenv.config();

const db = process.env.MONGO_URL ||"mongodb://127.0.0.127017/taskora";
const dbconnect = async()=>{
    try{
        await mongoose.connect(db);
        console.log("Mongo Database connected"); 
    }
    catch(error){
        console.log("Db connection error:",error.message);
        
    }
}
export default dbconnect;