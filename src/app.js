import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"
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

export { app }