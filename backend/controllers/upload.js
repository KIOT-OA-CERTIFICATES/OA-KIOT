import { v2 as cloudinary } from 'cloudinary'
import multer from "multer"
import Apihandler from '../utils/ApiHandler.js';
import fs from "fs"
import DataSchema from '../models/data.js';
cloudinary.config({ 
    cloud_name: 'dmbiqpg0z', 
    api_key: '777934722256838', 
    api_secret: 'rKJu2PhFLImXhA7MswGNp7JP7AI'
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file)
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

const addfile = Apihandler(async(req,res)=>{
    const file = req.files[0]
    const{username,email,semester,title,description} = req.body
    // console.log(semester)
   
    // console.log(newdata)
    const image_url =  (await cloudinary.uploader.upload(file.path)).secure_url
    console.log(image_url)
    let newdata = DataSchema({
        username:username,
        email:email,
        file:image_url,
        semester:semester,
        title:title,
        description:description
    })
    await newdata.save()
    fs.unlinkSync(file.path)
    res.send(image_url)
})

export {cloudinary, upload, addfile}