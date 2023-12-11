import jwt from "jsonwebtoken"
export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401)
    const token = authHeader.split(" ")[1]    
    // console.log(req.user)
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err) return res.json(err)
        console.log(decoded.UserInfo.role)
        req.user = decoded.UserInfo.userId
        req.role = decoded.UserInfo.role
        next()
    })
}