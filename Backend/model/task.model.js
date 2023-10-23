const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String, require:true},
    description : {type: String, require:true},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },   
});

const Task = mongoose.model("task",taskSchema);

module.exports = {Task}