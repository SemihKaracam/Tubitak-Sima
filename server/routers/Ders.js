import express from "express"
import Ders from "../models/Ders.js"
import Ogrenci from "../models/Ogrenci.js"
import mongoose from "mongoose"
const router = express.Router()


//TÜM DERSLERİ GETİR
router.get("/", async (req, res) => {
    try {
        const dersler = await Ders.find()
        res.json(dersler)
    } catch (err) {
        console.log(err)
    }
})

//BÖLÜME GÖRE DERSLERİ GETİR
router.get("/findlesson", async (req, res) => {
    const bolum = req.query.bolum
    try {
        const dersler = await Ders.find({
            bolumler: {
                $in: [bolum]
            }
        })
        res.json(dersler)
    } catch (err) {
        res.json(err)
    }
})

//BİR DERSİ GETİR
router.get("/find/:id", async (req, res) => {
    try {
        const ders = await Ders.findById(req.params.id)
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})

//DERS İSMİNDEN DERSİ BUL
router.get("/find", async (req, res) => {
    const lessonName = req.query.lesson
    console.log(lessonName)
    try {
        const ders = await Ders.findOne({ dersAdi: lessonName })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})

//Derse katılanlar
router.get("/katilim/:id", async (req, res) => {
    try {
        const ders = await Ders.findById(req.params.id, { "katilim": 1, "_id": 0 })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})

//Ders oluştur
router.post("/", async (req, res) => {
    try {
        const ders = await new Ders(req.body)
        await ders.save()
        res.json("New ders was created")
    } catch (err) {
        console.log(err)
    }
})

//Id'si verilen bir dersin yoklama bilgisini güncelle 
router.put("/attendance/:id", async (req, res) => {
    try {
        // Ders koleksiyonu içerisindeki dökümanların id'i req.params.id aynıysa uyuşuyorsa ve katilim adlı field'ında tutulan array içerisindeki 
        // objelerden date özelliği req.body.date ile eşitse katilanOgrenciler arrayina req.body.ogrenciId'yi pushla .
        const ders = await Ders.findOneAndUpdate({ "katilim.date": req.body.date, "_id": req.params.id }, {
            $push: {
                "katilim.$.katilanOgrenciler": req.body.ogrenciId
            }
        }, { new: true })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})





//Id'si ve Tarihi verilen dersin yoklamasında eşleşen günlerin yoklama bilgisini(derse katılan öğrencileri) getir
/*
router.get("/attendance/:id", async (req, res) => {
    try {
        const dateString = req.query.date
        const parts = dateString.split('-'); // Tarihi parçalara ayırır

        // Yıl, ay ve günü ayrı değişkenlere atar
        const year = parseInt(parts[2]);
        const month = parseInt(parts[1]) - 1; // Ay indeksi 0-11 arasında olduğu için 1 çıkarıyoruz
        const day = parseInt(parts[0]);

        // Tarihi oluşturur
        const date = new Date(year, month, day);
        const desiredDay = date.getDate()
        console.log(desiredDay)
        const ders = await Ders.find({
            $expr: {
                $eq: [{ $dayOfMonth: "$katilim.date" }, desiredDay]
            }
        })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})
*/


//Dersi güncelle
router.put("/:id", async (req, res) => {
    try {
        const ders = await Ders.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})

//Dersi sil
router.delete("/:id", async (req, res) => {
    try {
        await Ders.findByIdAndDelete(req.params.id)
        res.json("Ders was deleted")
    } catch (err) {
        console.log(err)
    }
})

//Belirli bir öğrencinin kayıtlı olduğu dersleri getir
router.get("/kayitli/:id", async (req, res) => {
    const ogrenciId = req.params.id
    const dersler = await Ders.find({
        kayitliOgrenciler: {
            $in: [ogrenciId]
        }
    }, { "dersAdi": 1, "_id": 0 })
    res.json(dersler)
})

//Ders adına ve öğrenci id'sine göre öğrencinin derse katılmadığı tarihleri getir
router.get("/yoklama/:ogrenciId", async (req, res) => {
    const ders = req.query.ders
    const ogrenciId = req.params.ogrenciId
    const tarihler = await Ders.aggregate([
        {
            $match: {
                dersAdi: ders,
                kayitliOgrenciler: ogrenciId
            }
        },
        {
            $unwind: "$katilim"
        },
        {
            $match: {
                "katilim.katilanOgrenciler": { $ne: ogrenciId }
            }
        },
        {
            $group: {
                _id: "$_id",
                tarihler: { $push: "$katilim.date" }
            }
        }
    ])
    res.json(tarihler)
})


//Eğer şuanki saat dersin başlangıç ve bitiş saati arasındaysa dersi getir.

router.get("/date", async (req, res) => {
    const currentDate = new Date().toLocaleTimeString();
    console.log(currentDate)
    try {
        const ders = await Ders.find({
            startTime: { $lt: currentDate },
            endTime: { $gt: currentDate }
        })
        res.json(ders)
    } catch (err) {
        console.log(err)
    }
})


// Belirli bir tarihte ve dersId'si bilinen dersin yoklama bilgilerini getir
router.get("/attendance", async (req, res) => {
    // const ders = await Ders.findOne({
    //     dersAdi:dersAdi,
    //     "katilim.date": hedefTarih
    // })
    const dersAdi = req.query.lesson
    const hedefTarih = new Date(req.query.date)
    const ders = await Ders.aggregate([
        {
            $match: {
                dersAdi: dersAdi // Dersin _id'sine göre eşleşme yap
            }
        },
        {
            $unwind: "$katilim" // Katilim dizisini ayrıştır
        },
        {
            $match: {
                "katilim.date": hedefTarih // Belirtilen tarihe sahip katılımı seç
            }
        },
        {
            $project: {
                katilim: 1 // Sadece katilim alanını getir
            }
        }
    ])
    const result = ders[0]
    res.json(result)
})

//Request'teki Query parametresinde belirtilen tarih ve ders'e göre öğrencilerin yoklama listesini getir
router.get("/getAttendance", async (req, res) => {
    // const selectedDate = req.query.date
    const selectedLesson = req.query.lesson
    try {
        const obj = await Ders.findOne({
            dersAdi: selectedLesson
        }, { "kayitliOgrenciler": 1, "_id": 0 })
        console.log(obj)
        const { kayitliOgrenciler } = obj
        const promises = kayitliOgrenciler.map((id) => (
            Ogrenci.findById(id)
        ))

        const lastResult = await Promise.all(promises)
        res.json(lastResult)
    } catch (err) {
        console.log(err)
    }
})


//Request'teki Query parametresinde belirtilen tarih ve ders'e göre öğrencilerin yoklama listesini getir
router.post("/updateAttendance", async (req, res) => {
    try {
        console.log(req.body)
        const ogrenci = await Ogrenci.findOne({
            okulNo: req.body.number
        })
        const ogrenciId = ogrenci._id.toString()
        const currentDate = new Date().toLocaleTimeString();

        console.log(currentDate)
        console.log(ogrenciId)


        // const ders = await Ders.find({
        //     startTime: { $lt: currentDate },
        //     endTime: { $gt: currentDate }
        // })
        
        // const dersId = ders[0]._id
    
        // const ders = await Ders.findOneAndUpdate({ "katilim.date": new Date()})
        // console.log(ders)

        // if (ders){
        //     console.log("evet")
        //     const ders = await Ders.findOneAndUpdate({ "katilim.date": new Date(), "_id": dersId }, {
        //         $push: {
        //             "katilim.$.katilanOgrenciler": req.body.ogrenciId
        //         }
        //     }, { new: true })
        // }
        // res.json(ders)
      
        // res.json(ogrenci)
    } catch (err) {
        console.log(err)
    }
})




export default router

