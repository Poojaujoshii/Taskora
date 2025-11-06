import mongoose from "mongoose";
import userSchema from "../Schema/UserSchema.js";

const User = mongoose.model("User",userSchema);
export default User;