import Apihandler from "../utils/ApiHandler.js";
import { User } from "../models/user.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import 

const Login = Apihandler(async(req,res)=>{
    const {email, password} = req.body

    if( !email || email.trim() == ""){
        res.send("Enter your email")
    }
    else if( !password || password.trim() == ""){
        res.send("Enter your password")
    }
    else{

        const value = jwt.sign({email, password}, "JSON-WEB-TOKEN")
        res.cookie("login", value, {maxAge:600000, secure:true, httpOnly:true})
        // console.log(value)
        res.send("Done")
    }
})

export {Login}