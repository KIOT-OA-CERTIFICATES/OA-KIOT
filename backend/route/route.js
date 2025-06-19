import { Router } from "express";
import { Login } from "../controllers/login.js";
const router = Router()

router.route("/").get((req,res)=>{
    res.send("Welcome to KIOT OA Certificate portal")
})
router.route("/login").post(Login)

export default router