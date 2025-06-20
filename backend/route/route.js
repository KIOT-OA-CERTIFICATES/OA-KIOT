import { Router } from "express";
import { Login } from "../controllers/login.js";
import { upload, addfile } from "../controllers/upload.js";
import { checkcookie } from "../controllers/cookies.js";
const router = Router()

router.route("/").get((req,res)=>{
    res.send("Welcome to KIOT OA Certificate portal")
})
router.route("/login").post(Login)
router.route("/upload").post(upload.any(), addfile)
router.route("/check").get(checkcookie)


export default router