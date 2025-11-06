import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const secretKey = process.env.JWT_SECRET || "My Secret Key"
export const  generateToken = (payload,expirytime="7d")=>{
   try{
     return jwt.sign(payload,secretKey, {expiresIn:expirytime})
   }
   catch(error){
        return new Error(error)
   }
}
export const verifyToken = (token)=>{
    try{
        return jwt.verify(token,secretKey)
    }
    catch(error){
        throw new Error("Invalid or expired token");
    }
}
