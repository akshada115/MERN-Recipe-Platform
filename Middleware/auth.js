import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const Authenticate = async (req,res,next) =>{
    const token = req.header("Authorization")
    try {
        if(!token) return res.json({message:"login first"})

        const decode = jwt.verify(token, "!@#$%^&*()");

         console.log("this is decoded data ",decode)

        const id = decode.userid

        let user = await User.findById(id)
 
        if(!user) return res.json({message:"User not exist"})

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
}