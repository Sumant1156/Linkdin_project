import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const authuser=async(req,res,next)=>{
  try{
   
    let token=req.cookies.token;
    if(!token){
      return res.status(400).json({message:"token not founnd"})
    }
      let verifytoken=await jwt.verify(token,process.env.JWT_SECREATE)
      if(!verifytoken){
        return res.status(400).json({message:"token not verify"})
      }
     
    req.userid=verifytoken.id;
    next()
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"token error",err})
  }
}
export default authuser;