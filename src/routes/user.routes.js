import express from "express";
import { sigunp } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(sigunp)


export default router
