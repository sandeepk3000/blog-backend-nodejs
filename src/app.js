import express from "express"
const app = express()
<<<<<<< HEAD
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"
import articleRoute from "./routes/article.routes.js"
const corsOptions = {
    origin: "*",
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.static("./public"))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.json({ limit: "16kb" }))

app.use("/api/v1/user", userRoute)

app.use("/api/v1/article", articleRoute)
export { app }
=======
app.get("/",(req,res)=>{
    console.log("home");
})
export {app}
>>>>>>> origin/main
