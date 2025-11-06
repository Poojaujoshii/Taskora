import mongoose from "mongoose";
import taskSchema from "../Schema/TaskSchema.js";

const Task = mongoose.model("Task",taskSchema);
export default Task;