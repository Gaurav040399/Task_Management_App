const express = require("express");
require("dotenv").config();
const cors = require("cors");
const io = require("socket.io");
const { connection } = require("./config/db");
const { userRouter } = require("./route/user.route");
const { taskRouter } = require("./route/task.route");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000 ;

app.use("/user",userRouter);
app.use("/task",taskRouter);

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to DataBase")
    } catch (error) {
        console.log(error);
        console.log("Cannot connect to DataBase")
    }
});