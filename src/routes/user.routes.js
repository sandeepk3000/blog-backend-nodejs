import express from "express";
import { sigunp,login,logout } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(sigunp)

router.route("/login").post(login)

router.route("/logout").post(verifyJWT, logout)

export default router
