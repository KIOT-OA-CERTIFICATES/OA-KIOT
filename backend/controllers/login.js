import Apihandler from "../utils/ApiHandler.js";
// import { User } from "../models/user.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import {UserSchema} from "../models/user.js"

const Login = Apihandler(async(req,res)=>{
    const {email, password} = req.body

    if( !email || email.trim() == ""){
        res.status(201).send("Enter your email")
    }
    else if( !password || password.trim() == ""){
        res.status(201).send("Enter your password")
    }
    else{
        const user = await UserSchema.findOne({email:email})

        if(!user){

            res.status(201).send("User not found")
        }
        else if(password != user.password){
            res.status(201).send("Password incorrect")
        }
        
        else{
        let username = user.username
        let value = jwt.sign({email, password, username}, "JSON-WEB-TOKEN")
        res.cookie("login", value, {maxAge: (60000 * 60 ), secure:true, httpOnly:true})
        // console.log(value)
        res.status(200).send("Login Successfull")
        //sample


           
        }

    }
})

export {Login}