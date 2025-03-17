import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../Models/User.js";

export const register = async (req,res)=>{
    const  {name, gmail, password } = req.body;

    try{
    let user = await User.findOne({gmail});
    if(user) return res.json({message:"User Already exist"});
//here i use hashpass objet to assign hash password with 10 salt round where both user have same password have unique hash key
    const hashpass = await bcrypt.hash(password,10)
    user = await User.create({name, gmail, password:hashpass});
    res.json({message:`Welcome! Let’s get started! ${user.name}`});
    }catch(err){
        res.json({message:Error})
    }
}

export const login = async(req, res)=>{
    const {gmail, password}=req.body;
try{
   let user = await User.findOne({gmail});
   if(!user) return res.json({message:"User not exited...."});

   const validPass = await bcrypt.compare(password,user.password);

   if(!validPass) return res.json({message:"oops Inavlid Crediatials"});

   //here i created webtoken to secure more and user not want login  when visot website
   const token = jwt.sign({userid:user.id}, "!@#$%^&*()",{
  expiresIn : "3h"
   });

   res.json({message:`Welcome to your dashboard! ${user.name}`, token})
}catch(err){
    res.json({message:Error});
}
}

export const profile = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (err) {
        console.error("Profile Fetch Error:", err);
        res.status(500).json({ message: "Failed to fetch profile", error: err.message });
    }
};
