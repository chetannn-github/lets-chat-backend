import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import {isLoggedIn} from "../utils/isLoggedIn.js"
const router = Router();


router.get("/:id",isLoggedIn,getMessages)
router.post("/send/:id",isLoggedIn,sendMessage)

export default router;