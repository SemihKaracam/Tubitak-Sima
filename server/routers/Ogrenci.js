import express from "express"
import Ogrenci from "../models/Ogrenci.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { verifyRole } from "../middleware/verifyRoles.js"
import moment from "moment"
const router = express.Router()

//Ogrencilerin hepsini getir
router.get("/", async (req, res) => {
    try{
        const students = await Ogrenci.find()
        res.json(students)
        console.log(moment().format("dddd"))
        
    }catch(err){
        console.log(err)
    }
})

//Ogrencilerin birini getir
router.get("/:id", async (req, res) => {
    try{
        const student = await Ogrenci.findById(req.params.id)
        res.json(student)
    }catch(err){
        console.log(err)
    }
})

//Belli bir öğrencinin kayıtlı olduğu dersleri getir
router.get("/kayitliDersler/:id", async (req, res) => {
    try{
        const students = await Ogrenci.findById(req.params.id,{"kayitliDersler":1,"_id":0})
        res.json(students)
    }catch(err){
        console.log(err)
    }
})
 
//Ogrenci oluştur
router.post("/", verifyRole("admin"),async (req, res) => {
    try{
        const student = await new Ogrenci(req.body)
        await student.save()
        res.json("New student was created")
    }catch(err){
        console.log(err)
    }
})


//Ogrenci güncelle
router.put("/:id", verifyRole("admin"),async(req,res)=>{
    try{
        const student = await Ogrenci.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(student)
    }catch(err){
        console.log(err)
    }
})

//Ogrenci sil
router.delete("/:id", verifyRole("admin"),async(req,res)=>{
    console.log(req.user)
    try{
        await Ogrenci.findByIdAndDelete(req.params.id)
        res.json("Student was deleted")
    }catch(err){
        console.log(err)
    }
})


//get a student
router.get("/find/:userId",async(req,res)=>{
    console.log(req.params.userId)
    try{
        const student = await Ogrenci.findOne({userId:req.params.userId})
        res.json(student)
    }catch(err){
        res.json("Error")
    }
})

export default router




