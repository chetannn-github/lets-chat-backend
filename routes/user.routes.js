import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import {isLoggedIn} from "../utils/isLoggedIn.js"

const router = Router();

router.get("/",isLoggedIn,getAllUsers)


export default router;