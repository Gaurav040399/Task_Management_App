const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name : {type:String, require:true},
    email : {type:String, require:true, unique:true},
    role : {type:String, require:true, default:"user", enum:["admin", "user"]},
    password : {type:String, require:true},
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
});

const User = mongoose.model("user",userSchema);

module.exports = {User}