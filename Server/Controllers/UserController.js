import User from "../Models/UserModel.js"
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";

export const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().select("-password");
        if(!users || users.length===0){
            return res.status(400).json({success:false, message:"No users found"})
        }
        return res.status(200).json({success:true,message:"All users fetched successfully", data:users})
    }
    catch(err){
        return res.status(500).json({success:false, message:"Something went wrong",err:err.message})
    }
}
export const getUserProfile = async(req,res)=>{
    try{
        const id = req.user.id;
        if(!id){
            return res.status(404).json({success:false, message:"No user found"})
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({success:true, message:"user found",data:{
                    _id:user._id,
                    name:user.name,
                    email: user.email,
                    role:user.role,
                    theme:user.theme,
                }})

    }
    catch(error){
      return res.status(500).json({success:false, message:"Something went wrong",err:err.message})
    }
}
export const updateUserprofile = async(req,res)=>{
    try{
        const id = req.user.id;
        if(!id){
            return res.status(404).json({success:false, message:"User not found"})
        }
        const  {name,theme} = req.body;
        const updateData = {};
        if(name) updateData.name = name;

        if(theme){
            const validThemes  = ["light","dark"];
            if(!validThemes.includes(theme)){
                 return res.status(400).json({success:false, message:"Invalid theme. Allowed values are light and dark"})
            }
        }
        updateData.theme = theme;
        if(Object.keys(updateData).length === 0){
             return res.status(400).json({success:false, message:"Nothing to update"})
        }
        const updateUser = await User.findByIdAndUpdate(id,updateData,{
            new:true,
        }).select("-password");
        if(!updateUser){
             return res.status(404).json({success:false, message:"User not found"})
        }
         return res.status(200).json({success:true, message:"Profile updated Successfully",data:{
            _id:updateUser._id,
            name: updateUser.name,
            email:updateUser.email,
            role:updateUser.role,
            theme:updateUser.theme,
         }})

    }
    catch(error){
         return res.status(500).json({success:false, message:"Something went  wrong"})
    }
}