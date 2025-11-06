import express from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/AuthController.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";


const AuthRoute = express.Router();
AuthRoute.post("/register", registerUser);
AuthRoute.post("/login",loginUser)
AuthRoute.post("/logout",authenticateUser,logoutUser)
export default AuthRoute;