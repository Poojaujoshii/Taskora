import express from "express";
import { createtask, deletetask, getTasks, updateTask } from "../Controllers/TaskController.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";


const router = express.Router();
router.get("/get",authenticateUser,getTasks);
router.post("/create",authenticateUser,createtask);
router.put("/update/:id",authenticateUser,updateTask);
router.delete("/delete/:id",authenticateUser,deletetask);

export default router;
