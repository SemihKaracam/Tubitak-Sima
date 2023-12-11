import mongoose from "mongoose"
const DersSchema = mongoose.Schema({
    dersAdi: {
        type: String,
        required: true
    },
    ogretmenler: {
        type:[String],
        required: true
    },
    bolumler:{
        type:[String],
        required:true
    },
    kayitliOgrenciler:{
        type:[String],
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    katilim:{
        type:[
            {
                date:{
                    type:Date,
                    required:true,
                    default:new Date(),
                },
                katilanOgrenciler:{
                    type:[String],
                    default:[]
                }
            }
        ],
        required:true,
        default:[]
    },
}, { timestamps: true })

export default mongoose.model("Ders", DersSchema)



// Matematik : [
//     {
//         date:
//         katilanOgrenciler:[id1,id2,id3,]
//     }
// ]