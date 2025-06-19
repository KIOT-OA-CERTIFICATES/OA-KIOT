import Apihandler from "../utils/ApiHandler.js";
// import { User } from "../models/user.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import {UserSchema} from "../models/user.js"

const Login = Apihandler(async(req,res)=>{
    const {email, password} = req.body

    if( !email || email.trim() == ""){
        res.send("Enter your email")
    }
    else if( !password || password.trim() == ""){
        res.send("Enter your password")
    }
    else{
        const user = await UserSchema.findOne({email:email})

        if(!user){
            res.send("User not found")
        }
        else if(password != user.password){
            res.send("Password incorrect")
        }
        else{
        let value = jwt.sign({email, password}, "JSON-WEB-TOKEN")
        res.cookie("login", value, {maxAge:600000, secure:true, httpOnly:true})
        // console.log(value)
        res.send(user)
        }
    }
})

export {Login}