import app from "./app.js";
import dotenv from "dotenv"
import router from "../route/route.js";
import MONGODB from "../mongodb/index.js";
dotenv.config({
    path:".env"
})
app.use(router)

await MONGODB()

let PORT = process.env.PORT || 8081
app.listen(PORT,()=>{
    console.log(`Server ruuning on port :${PORT}`)
})