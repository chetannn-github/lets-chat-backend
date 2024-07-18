import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../utils/isLoggedIn.js";

const router = Router();

router.post("/login",login)
router.post("/signup",signup)

router.post("/logout",isLoggedIn,logout)

export default router;