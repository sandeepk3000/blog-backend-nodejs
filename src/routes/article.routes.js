import express from "express"
import { createArticle, deleteArticle, updateArticle } from "../controllers/article.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()



router.route("/createArticle").post(verifyJWT,upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    }
]),createArticle)

router.route("/updateArticle/:articleId").post(verifyJWT,upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    }
]),updateArticle)

router.route("/deleteArticle/:articleId").get(verifyJWT,deleteArticle)
export default router