import DataSchema from "../models/data.js"
import { UserSchema } from "../models/user.js"
import ApiHandler from "../utils/ApiHandler.js"


const finddata = ApiHandler(async(req,res)=>{

    const{username, semester} = req.body
    // console.log(username)
    // if(username)
    const user = await UserSchema.findOne({username:username})
    if(user){
        let data = await DataSchema.find({
            $and:[{username},{semester}]
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