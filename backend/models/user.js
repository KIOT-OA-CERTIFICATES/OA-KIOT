import mongoose, { Schema } from "mongoose";

const User = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const UserSchema = mongoose.model("User", User)

export {User}