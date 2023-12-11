import mongoose from "mongoose"

const AkademisyenSchema = mongoose.Schema({
    ad: {
        type: String,
        required: true
    },
    soyad:{
        type:String,
        required:true
    },
    unvan:{
        type:String
    },
    bolum:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    verdigiDersler:{
        type:[
            {
                dersAdi:String,
                dersId:String
            }
        ],
        default:[]
    }

}, { timestamps: true })

export default mongoose.model("Akademisyen", AkademisyenSchema)



