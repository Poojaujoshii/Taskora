import Task from "../Models/TaskModel.js";

//create task
export const createtask = async(req,res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

//get all tasks
export const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

//update task
export const updateTask = async (req,res)=>{
    try{
        const updatedtask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedtask){
            return res.status(404).json({message:"task not found"})
        }
        res.status(200).json(updatedtask)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

//delete task

export const deletetask = async(req,res)=>{
    try{
        const deletedtask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedtask){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}