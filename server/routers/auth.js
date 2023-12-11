import express from "express"
import bcrypt from "bcrypt"
import Akademisyen from "../models/Akademisyen.js"
import Ogrenci from "../models/Ogrenci.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const router = express.Router()


//register
router.post("/signup",async(req,res)=>{
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    try{
            const user = new User({...req.body,password:hashedPassword})
            await user.save()
            res.json(user)
    }catch(err){
        res.json("Signup failed")
    }
})


//login
router.post("/signin", async (req, res) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){ return res.status(401).json("Hatalı username.Bu username'e sahip bir user yok")}
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) {return res.status(401).json("Hatali şifre.Bu şifreye sahip bir user yok")}
        const token = jwt.sign({
            "UserInfo":{
                "userId":user._id,
                "role":user.role
            }
        },process.env.JWT_SECRET_KEY)
        const {password,...others} = user._doc // passwordu göstermek güvenlik açısından zararlı bir durum bu yüzden response'da göstermiyoruz.
        res.status(200).json({...others,accessToken:token})
    }catch(err){
        res.json(err)
    }
})



export default router