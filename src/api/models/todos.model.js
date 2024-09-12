import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"
    }
},{timestamps:true})

export default mongoose.model("todo",todoSchema);