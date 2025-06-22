import DataSchema from "../models/data.js"
import { UserSchema } from "../models/user.js"
import ApiHandler from "../utils/ApiHandler.js"


const finddata = ApiHandler(async(req,res)=>{

    const{username, semester} = req.body
    // console.l    og(username)
    // if(username)
    // console.log(username)
    const euser = await UserSchema.findOne({email:username})
    const uuser = await UserSchema.findOne({username:username})

    // console.log(uuser)
    if(uuser){
        let data = await DataSchema.find({
            $and:[{username:username},{semester:semester}]
        })
        // console.log(data)
        
        res.send(data)
        // console.log(data)    
    }
    else if(euser){
        let data = await DataSchema.find({
            $and:[{email:username},{semester:semester}]
        })
        // console.log(data)
        
        res.send(data)
        // console.log(data)
    }
    else{
        res.status(201).send("No user found")
    }
})
export default finddata