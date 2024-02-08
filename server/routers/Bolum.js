import express from "express"
import { verifyRole } from "../middleware/verifyRoles.js"
import Akademisyen from "../models/Akademisyen.js"
import Ogrenci from "../models/Ogrenci.js"
import Ders from "../models/Ders.js"
import Bolum from "../models/Bolum.js"

const router = express.Router()

//Bolumlerin hepsini getir
router.get("/", async (req, res) => {
    try{
        const departments = await Bolum.find()
        res.json(departments)
    }catch(err){
        console.log(err)
    }
})

//Bolumlerden birini getir
router.get("/find/:id", async (req, res) => {
    try{
        const department = await Bolum.findById(req.params.id)
        res.json(department)
    }catch(err){
        console.log(err)
    }
})


//Bolum oluştur
router.post("/", verifyRole("admin","academician"),async (req, res) => {
    try{
        const department = await new Bolum(req.body)
        await department.save()
        res.json("New department was created")
    }catch(err){
        console.log(err)
    }
})


//Bolum güncelle
router.put("/:id", verifyRole("admin"),async(req,res)=>{
    try{
        const department = await Bolum.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(department)
    }catch(err){
        console.log(err)
    }
})

//Bolum sil
router.delete("/:id", verifyRole("admin"),async(req,res)=>{
    try{
        await Bolum.findByIdAndDelete(req.params.id)
        res.json("Department was deleted")
    }catch(err){
        console.log(err)
    }
})

//Tüm Collection'ların adetini al, dashboard'da göstermek için kullanıcam
router.get("/all",verifyRole("admin"),async(req,res)=>{
    try{
        const list = await Promise.all([await Ogrenci.countDocuments({}),await Akademisyen.countDocuments({}),await Ders.countDocuments({}),await Bolum.countDocuments()])
        res.json(list)
    }catch(err){
        res.json(err)
    }
})


export default router





