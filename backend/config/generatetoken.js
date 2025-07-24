import jwt from "jsonwebtoken"
export const generatetoken=(id)=>{
  let token=  jwt.sign({id},process.env.JWT_SECREATE,{expiresIn:"7d"})
  return token
}
