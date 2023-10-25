const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../model/user.model");


const register = async (req,res)=>{
    try {
        const {name,email,role,password} = req.body;

        // Search is user already present or not
        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            return res.status(400).json({message:"User already present, Please Login",isOk:false})
        }

        const hashPassword = await bcrypt.hash(password,4);
        const newUser = new User({name,email,role,password:hashPassword})
        await newUser.save();
        res.status(201).json({msg:"Registration successful",isOk:true})
    } catch (error) {
        res.status(400).json({error:error.message,message:"Registration failed",isOk:false})
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        // Search is user already present or not
        const isUserPresent = await User.findOne({email});
        if(!isUserPresent){
            return res.status(404).json({message:"User Not Found, Please Register First",isOk:false})
        }

        const isPasswordCorrect = bcrypt.compareSync(password,isUserPresent.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message:"Incorrect password",isOk:false})
        }

        const token =  jwt.sign({userID:isUserPresent._id,email:isUserPresent.email,role:isUserPresent.role}, process.env.secretKey)
        // console.log(token)
        res.status(200).json({message:"Login Successful", token:token,isOk:true})
    } catch (error) {
        res.status(400).json({error:error.message,message:"Login failed",isOk:false})
    }
}

module.exports = {register,login}