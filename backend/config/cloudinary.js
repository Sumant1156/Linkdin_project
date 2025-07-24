import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises"
  
 export const updateoncloudinary=async(filepath)=>{
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key:process.env.CLOUDINARY_KEY, 
      api_secret:process.env.CLOUDINARY_SECRET
  });
    try{
      if(!filepath){
        return null
      }
      const Result = await cloudinary.uploader
      .upload(filepath
      )
      await fs.unlink(filepath)
      return Result.secure_url
    }
    catch(err){
     await fs.unlink(filepath)
      console.log("cloudinary err",err)
    
    }

  }