const express = require("express");
const taskRouter = express.Router();
const {allTask,singleTask,createTask,updateTask,deleteTask,adminRoute} = require("../controller/task.controller");
const { authenticateUser } = require("../middleware/auth");
const { authRole } = require("../middleware/roleBaseAcc");

taskRouter.get("/",  allTask);
taskRouter.get("/admin/user",authenticateUser,authRole("admin"),adminRoute);
taskRouter.post("/create",authenticateUser, createTask)
taskRouter.get("/:id",singleTask)
taskRouter.patch("/update/:id",updateTask)
taskRouter.delete("/delete/:id",deleteTask)


module.exports = {taskRouter}