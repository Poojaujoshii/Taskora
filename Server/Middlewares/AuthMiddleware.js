import {verifyToken} from "../Utilities/JWT.js"
import BlacklistedToken from "../Models/BlackListModel.js"

export const authenticateUser = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({success:false, message:"No Token Provided"})
        }
        const token = authHeader.split(" ")[1];

        const isBlacklisted = await BlacklistedToken.findOne({token});
        if(isBlacklisted){
           return  res.status(401).json({success:false, message:"Token is Blacklisted"})
        }
         const decoded = verifyToken(token);
         req.user = {id:decoded.id, role:decoded.role};
         next();
    }
    catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}