import { v2 as cloudinary } from 'cloudinary'
import multer from "multer"
import Apihandler from '../utils/ApiHandler.js';
import fs from "fs"
import DataSchema from '../models/data.js';
import { UserSchema } from '../models/user.js';
import { cache } from './finddatas.js';
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
   let type = file.mimetype
    // console.log(type.split("/")[1])
    const image_url =  (await cloudinary.uploader.upload(file.path)).secure_url
    // console.log(image_url)
    let newdata = DataSchema({
        username:username,
        email:email,
        file:image_url,
        semester:semester,
        title:title,
        description:description,
        filetype:type.split("/")[1]
    })
  await newdata.save()
  

  fs.unlinkSync(file.path)
  
  let data = await DataSchema.find({
    email: email,
    semester : semester
  })
  console.log(data);
  await cache.del(`user/${email}/${semester}`);

  await cache.setEx(`user/${email}/${semester}`,"1000",JSON.stringify(data));
  
  
    res.send({url:image_url , type:type.split("/")[1]})
})

const newuser = Apihandler(async(req,res)=>{
  const{userName, email, password} = req.body
  // console.log([userName, email].some((item)=>item.trim()==""))
  if([userName, email, password]?.some((item)=> item.trim() == ""
  )){
    res.status(201).send("Enter full details")
  }
  else{
    const user =await UserSchema.findOne({
      $or:[{email},{userName}]
    })
    if(!user){
      const newuser = UserSchema({
        username:userName,
        email:email,
        password:password
      })
      await newuser.save()
      // console.log(newuser)
      res.status(200).send("Success")
    }
    else{
      res.status(201).send("User already exist")
    }
  }
})

export {cloudinary, upload, addfile, newuser}