import { resolve } from "path"
import DataSchema from "../models/data.js"
import { UserSchema } from "../models/user.js"
import ApiHandler from "../utils/ApiHandler.js"
import {createClient} from "redis"
const cache = createClient()
await cache.connect()

const finddata = ApiHandler(async (req, res) => {
    
    const { username, semester } = req.body
    // console.l    og(username)
    // if(username)
    const callback = async (logic) => {
        
        const cachedata = await cache.get(`user/${username}/${semester}`)
        if (cachedata) return JSON.parse(cachedata)
        
            return new Promise(async(res, rej) => {
               try {
                res(await logic())
               } catch (error) {
                rej(error)
               }
            })
        
    }

    
    return res.send(await callback(async () => {

        try {

            
            const euser = await UserSchema.findOne({ email: username })
            const uuser = await UserSchema.findOne({ username: username })


            // console.log(uuser)
            if (uuser) {
                console.log("here");
                let data = await DataSchema.find({
                    $and: [{ username: username }, { semester: semester }]
                })
                // console.log(data)

                await cache.setEx(`user/${username}/${semester}`, 1000, JSON.stringify(data))
                res.send(data)
                // console.log(data)    
            }
            else if (euser) {
                let data = await DataSchema.find({
                    $and: [{ email: username }, { semester: semester }]
                })
                console.log(data)
                await cache.setEx(`user/${username}/${semester}`, 1000, JSON.stringify(data))

                return data
                // console.log(data)
            }
            else {
                return "No user found"
            }
        } catch (error) {
            console.error(error);

        }
    }).then(res => {
        return res
    }
    ))
    
    
})
export { finddata, cache }