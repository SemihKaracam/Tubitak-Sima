import mongoose from "mongoose"

const OgrenciSchema = mongoose.Schema({
    ad: {
        type: String,
        required: true
    },
    soyad:{
        type:String,
        required:true
    },
    okulNo: {
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    bolum:{
        type:String,
        required:true
    },
    image: {
        type: String,
    },

}, { timestamps: true })

export default mongoose.model("Ogrenci", OgrenciSchema)