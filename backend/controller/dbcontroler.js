import { json } from "express"
import { updateoncloudinary } from "../config/cloudinary.js"
import { generatetoken } from "../config/generatetoken.js"
import User from "../sample/sample.js"
import bcrypt from "bcryptjs"

import post from "../sample/postschema.js"
import { io } from "../index.js"

export const signup=async(req,res)=>{
  
  try{
  const {firstname,lastname,username,email,password}=req.body
  
  if(!firstname ||!lastname ||!username ||!email ||!password){
    return res.status(400).json({message:"please enter full detail"})
  }
  let exituser=await User.findOne({username})
  if(exituser){
    return res.status(400).json({message:"you are already signup"})
  }
  if(password.length<8){
    return res.status(400).json({message:"password atleast 8 char"})
  }
  let hashpassword=await bcrypt.hash(password,10)
  let user=await User.create({
    firstname,
    lastname,
    username,
    email,
    password:hashpassword,
  })
  let token=generatetoken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
   F
    secure: true,
    sameSite:"NONE",
    maxAge:7*24*60*60*1000
    
  })
 
  return res.status(201).json(user)
}
catch(err){
  return res.status(500).json({message:"signup error",err})
}
}
export const login=async(req,res)=>{
  try{
    
    const {email,password}=req.body
  if(!email ||!password){
    return res.status(400).json({message:"please enter full detail"})
  }
  let exituser=await User.findOne({email})
  
  if(!exituser){
    return res.status(400).json({message:"you are not signup"})
  }
  let match=await bcrypt.compare(password,exituser.password)
  if(!match){
    return res.status(400).json({message:"Incorrect password"})
  }
  let token=generatetoken(exituser._id)
 
  res.cookie("token",token,{
    httpOnly:true,
  
     secure: true,
    sameSite:"NONE",
    maxAge:7*24*60*60*1000
    
  })
 
  return res.status(201).json(exituser)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"login err",err})
  }
}
export const logout=async(req,res)=>{
  
  try{
     res.clearCookie("token")
     return res.status(200).json({message:"logout successfully"})
  }
  catch(err){
    return res.status(500).json({message:"error in logout",err})
  }
}
export const getuser=async(req,res)=>{
  
  try{
   
    let userid=req.userid
   
    let exituser=await User.findById(userid).select("-password")

    if(!exituser){
      return res.status(400).json({message:"token user not exist"})
    }
    
    return res.status(200).json(exituser)

  }
  catch(err){
    console.log(err)
  }
}
export const updateprofile=async(req,res)=>{
  console.log("hello")
  try{
  
    const {firstname,lastname,username,password,email,location,gender}=req.body
    let skill=req.body.skill? JSON.parse(req.body.skill) :[]
    let education=req.body.education? JSON.parse(req.body.education) :[]
    
    let profileimage
    let coverimage
    if(req.files.profileimage){
  profileimage=await updateoncloudinary(req.files.profileimage[0].path)
    }
    if(req.files.coverimage){
      coverimage=await updateoncloudinary(req.files.coverimage[0].path)
        }
        let user=await User.findByIdAndUpdate(req.userid,{
          firstname,lastname,username,location,gender,skill,education,profileimage,coverimage}, { new: true }
        ).select("-password")
        return res.status(200).json(user)
  }
  catch(err){
    console.log("updateprofile controller error",err)
    return res.status(500).json({message:"update profile route"})
  }

}
export const Postcreate=async(req,res)=>{
  try{
  let {description}=req.body
  let newpost;
  if(req.file){
    let image=await updateoncloudinary(req.file.path)
     newpost=await post.create({
      author:req.userid,
      description,
      image
    })
  }
  else{
    newpost=await post.create({
      author:req.userid,
      description,
    })
  }
  return res.status(200).json(newpost)
}
catch(err){
  console.log("create-post err",err)
  return res.status(500).json({message:err})
}
}
export const getpost=async(req,res)=>{
 
  try{
    let result=await post.find().populate("author","firstname lastname profileimage createdAt")
    .populate("Comment.user", "firstname lastname profileimage ")
   .sort({createdAt:-1})
    return res.status(200).json(result)
  }
  catch(err){
    return res.status(500).json(err)
  }
}
export const like=async(req,res)=>{

  try{
    
  const postid=req.params.id
  const userid=req.userid
 
  let postobj=await post.findById(postid)
  
  if(!postobj){
   return res.status(400).json({message:"post not exist"})
  }
  if(postobj.like.includes(userid)){
    postobj.like=postobj.like.filter((id)=>id!=userid)
  }
  else{
    postobj.like.push(userid)
  }
  await postobj.save()
  io.emit("likeupdated",{postid,likes:postobj.like})
  return res.status(200).json(postobj)
}
catch(err){
  return res.status(500).json({message:`like err ${err}`})
}
}
export const comment=async(req,res)=>{
  
  try{
  let id=req.params.id;
  let userid=req.userid
 
  let {commentuser}=req.body
  
  let postobj=await post.findByIdAndUpdate(id,{
    $push:{Comment:{content:commentuser,user:userid}}
  },{new:true})
  .populate("Comment.user", "firstname lastname profileimage")
  
  return res.status(200).json(postobj)
}
catch(err){
  return res.status(500).json({message:`comment err,${err}`})
}
}
  
