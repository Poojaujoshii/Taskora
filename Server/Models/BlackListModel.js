import mongoose from "mongoose";
import blacklistSchema from "../Schema/BlackList.js";
 const BlacklistedToken = mongoose.model("BlacklistedToken",blacklistSchema);
 export default BlacklistedToken;