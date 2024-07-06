import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"

const corsOptions = {
    origin: "*",
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.static("./public"))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.json({ limit: "16kb" }))

export { app }