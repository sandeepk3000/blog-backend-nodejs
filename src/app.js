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

export { app }