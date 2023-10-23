const {Task} = require("../model/task.model");
const {User} = require("../model/user.model");

const allTask = async(req,res)=>{
    try {
        const task = await Task.find();
        res.status(200).json({data:task})
    } catch (error) {
        res.status(400).json({error:error.message,message:"Bad request"})
    }
}

const singleTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id:id});
        res.status(200).json({data:task})
    } catch (error) {
        res.status(400).json({error:error.message,message:"Bad request"})
    }
}
const createTask = async(req,res)=>{
    try {
        const {title , description} = req.body;

        const newTask = new Task({title,description});
        // console.log(req.userID)
        const user = await User.findOne({_id:req.userID})
        user.tasks.push(newTask._id)
        await user.save();
        console.log(user)
        await newTask.save();
        res.status(200).json({message:"Task created secussful", task:newTask});
    } catch (error) {
        res.status(400).json({error:error.message,message:"Bad request"})
    }
}


const updateTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate({_id:id}, {...req.body},{ new: true });
        res.status(200).json({message:"Task Updated secussful", task:task});
    } catch (error) {
        res.status(400).json({error:error.message,message:"Bad request"})
    }
}
const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete({_id:id});
        res.status(200).json({message:"Task Deleted secussful", task:task});
    } catch (error) {
        res.status(400).json({error:error.message,message:"Bad request"})
    }
}

const adminRoute =  async (req, res) => {
    try {
      // Query the database to get all users and populate their tasks
      const users = await User.find().populate("tasks");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching user tasks.' });
    }
  }


module.exports = {allTask,singleTask,createTask,updateTask,deleteTask,adminRoute}