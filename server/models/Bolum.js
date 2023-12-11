import mongoose from "mongoose"

const BolumSchema = mongoose.Schema({
    bolumAdi: {
        type: String,
        require: true
    },
    // bolumdekiOgrenciler: { // Bir öğrenci birden fazla bölümde bulunabilir
    //     type: [
    //         {
    //             ogrenciAd: String,
    //             ogrenciSoyad: String,
    //             ogrenciId: String
    //         }
    //     ],
    //     _id: false,
    //     default: []
    // },
    // bolumdekiAkademisyenler: { // Bir akademisyen birden fazla bölümde çalışabilir
    //     type: [
    //         {
    //             akademisyenAd: String,
    //             akademisyenSoyad: String,
    //             akademisyenId: String
    //         }
    //     ],
    //     _id: false,
    //     default: []
    // }
}, { timestamps: true })

export default mongoose.model("Bolum", BolumSchema)