import mongoose, { Schema } from "mongoose";
const Data = new Schema({
    username    :{
        type:String
    },
    email:{
        type:String
    },
    file:{
        type:String
    },
    semester:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    }
},{
    timestamps:true
})

const DataSchema = mongoose.model("data", Data)
export default DataSchema