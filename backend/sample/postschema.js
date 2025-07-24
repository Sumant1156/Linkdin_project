import mongoose from "mongoose";

const postschema=new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  description:{
    type:String,
    default:""
  },
  image:{
    type:String
  },
  like:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  Comment:[
    {
      content:{type:String},
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    }
  ]
},{timestamps:true})
const post=mongoose.model("post",postschema)
export default post