import express from "express";
import {authenticateUser} from "../Middlewares/AuthMiddleware.js"
import {authorizeRole} from "../Middlewares/RoleMiddleware.js"
import { getAllUsers } from "../Controllers/UserController.js";

const users = express.Router();
users.get("/users",authenticateUser,authorizeRole("admin"),getAllUsers)

export default users;