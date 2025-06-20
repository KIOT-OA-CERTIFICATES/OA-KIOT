import DataSchema from "../models/data.js"
import ApiHandler from "../utils/ApiHandler.js"


const finddata = ApiHandler(async(req,res)=>{

    const{username, semester} = req.body
    console.log(username)
    let data = await DataSchema.find({
        $and:[{username},{semester}]
    })
    res.send(data)
    console.log(data)
})
export default finddata