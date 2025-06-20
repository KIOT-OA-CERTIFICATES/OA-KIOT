import cookieParser from "cookie-parser";
import Apihandler from "../utils/ApiHandler.js";
import jwt from "jsonwebtoken"
const checkcookie = Apihandler(async(req,res)=>{
    const cookie = req.cookies.login
    if(cookie){
        const data = jwt.verify(cookie,"JSON-WEB-TOKEN")
    if(data.email){
        res.send(data)
    }else{
        res.send("Please login")
    }
    }
    else{
        res.send("Please login")
    }
    
})
export {checkcookie}