import mongoose from "mongoose";
export const connectdb=async()=>{
  try{
    await mongoose.connect(process.env.DATABASE)
    console.log("Db connected")
  }
  catch(err){
    console.log(err)
  }
}