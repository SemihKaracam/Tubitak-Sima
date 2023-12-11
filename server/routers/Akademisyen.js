import express from "express"
const router = express.Router()
import Akademisyen from "../models/Akademisyen.js"

//Akademisyenlerin hepsini getir
router.get("/", async (req, res) => {
    try{
        const academicians = await Akademisyen.find()
        res.json(academicians)
    }catch(err){
        console.log(err)
    }
})

//Akademisyenlerden birini getir
router.get("/:id", async (req, res) => {
    try{
        const academician = await Akademisyen.findById(req.params.id)
        res.json(academician)
    }catch(err){
        console.log(err)
    }
})


//Akademisyen oluştur
router.post("/", async (req, res) => {
    try{
        const academician = await new Akademisyen(req.body)
        await academician.save()
        res.json("New academician was created")
    }catch(err){
        console.log(err)
    }
})


//Akademisyen güncelle
router.put("/:id",async(req,res)=>{
    try{
        const academician = await Akademisyen.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(academician)
    }catch(err){
        console.log(err)
    }
})

//Akademisyen sil
router.delete("/:id",async(req,res)=>{
    try{
        await Akademisyen.findByIdAndDelete(req.params.id)
        res.json("Academician was deleted")
    }catch(err){
        console.log(err)
    }
})

// UserId'ye göre akademisyeni getir
router.get("/find/:userId",async(req,res)=>{
    console.log(req.params.userId)
    try{
        const akademisyen = await Akademisyen.findOne({userId:req.params.userId})
        res.json(akademisyen)
    }catch(err){
        res.json("Error")
    }
})
export default router



