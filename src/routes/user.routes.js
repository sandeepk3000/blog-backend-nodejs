import express from "express";
import { signup,login,logout, getUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").post(verifyJWT, logout)

router.route("/getUser").get(verifyJWT,getUser)
export default router
