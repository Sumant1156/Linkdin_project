import express from "express"
import dotenv  from "dotenv"
import authrouter from "./route/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectdb } from "./config/db.js"
import http from "http"
import { Server } from "socket.io"

let app=express()
dotenv.config()
const server=http.createServer(app)
export const io=new Server(server,{
  cors:{
    origin:"https://linkdin-frontent.onrender.com",
    credentials:true
  }
})
app.use(cors({
  origin:"https://linkdin-frontent.onrender.com",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/",authrouter)
io.on("connection",(socket)=>{
  console.log("user connected",socket.id)
  socket.on("disconnect",(socket)=>{
    console.log("user disconnected",socket.id)
  })
})
let port=process.env.PORT 
server.listen(port,()=>{
  console.log(`server is statrted at ${port}`)
  connectdb()
})
app.get("/",(req,res)=>{
  res.send("this is home page sumant")
})
