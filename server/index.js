import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import studentsRouter from "./routers/Ogrenci.js"
import lessonsRouter from "./routers/Ders.js"
import departmentsRouter from "./routers/Bolum.js"
import academiciansRouter from "./routers/Akademisyen.js"
import authRouter from "./routers/auth.js"
const app = express()
dotenv.config()

mongoose.connect("mongodb://localhost/test").then(() => {
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())

app.listen(5000,()=>{
    console.log("Server is running")
})

app.use("/students",studentsRouter)
app.use("/lessons",lessonsRouter)
app.use("/departments",departmentsRouter)
app.use("/academicians",academiciansRouter)
app.use("/auth",authRouter)


