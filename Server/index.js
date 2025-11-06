import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dbconnect from "./Config/DBConfig.js";
import router from "./Routes/TaskRoute.js";
import { errorhandling } from "./Middlewares/ErrorHandling.js";
import Authrouter from "./Routes/AuthRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());


dbconnect();
app.use("/api/tasks",router)
app.use("/api/Auth",Authrouter)
app.use(errorhandling);
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`);
}); 
