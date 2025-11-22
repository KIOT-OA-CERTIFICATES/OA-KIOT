import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer"
import apicache from "apicache"
const app = express()
const upload = multer()
app.use(express.json())
app.use(cookieParser())
// app.use(upload.any())



app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
export default app