import authuser from "../middleware/authuser.js"
import { comment, getpost, getuser, like, login, logout, Postcreate, signup, updateprofile } from "../controller/dbcontroler.js"
import express, { Router } from "express"
import upload from "../middleware/multer.js"
let authrouter=express.Router()
authrouter.post("/signup",signup)
authrouter.post("/login",login)
authrouter.get("/logout",logout)
authrouter.get("/getuser",authuser,getuser)
authrouter.put('/updateprofile',authuser,upload.fields([
  {name:"profileimage",maxCount:1},
  {name:"coverimage",maxCount:1},
]), updateprofile)
authrouter.post("/create",authuser,upload.single('image'),Postcreate)
authrouter.get("/getpost",authuser,getpost)
authrouter.get("/like/:id",authuser,like)
authrouter.post("/comment/:id",authuser,comment)
export default authrouter