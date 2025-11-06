import bcrypt from "bcrypt";
import User from "../Models/UserModel.js";
import { generateToken } from "../Utilities/JWT.js";
import BlacklistedToken from "../Models/BlackListModel.js";

// Register

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    if (!password || password.trim() === "") {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(201).json({
      success: true,
      message: "Welcome to Taskora ✨",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


//Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", req.body);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) throw new Error("User not found 😢");

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) throw new Error("Invalid password 🚫");

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      success: true,
      message: `Welcome back ${user.name} 👑`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

//logout
export const logoutUser = async(req,res)=>{
  try{
    // get "authorisation header"
    const  authHeader = req.headers.authorization;

    //basic checks header preasesnt and starts with bearer
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      throw new Error("No Token Provided")
    }
    //extract the raw token (the second pat after space)
    const token = authHeader.split(" ")[1];

    //decode the token (no verify needed we just want  its expiry time)
    const decoded = jwt.decode(token);
    if(!decoded || !decoded.exp){
      throw new Error("Invalid Token");
    }
    //convert expiry time in seconds to js date(ms)
    const expiresAt = new Date(decoded.exp*1000);

    //Save token to blacklist with its natural expiry
    await  BlacklistedToken.create({token, expiresAt});

    //response
    res.status(200).json({
      success:true,
      message:"Logged out successfully"
    })
  }
  catch(error){
    res.status(400).json({success:false,message:error.message})
  }
}
