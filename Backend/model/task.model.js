const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String, require:true},
    description : {type: String, require:true},
    status : {type: String, require:true, enum:["Pending","Completed","Not Started"]},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },   
});

const Task = mongoose.model("task",taskSchema);

module.exports = {Task}