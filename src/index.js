import { app } from "./app.js";
import dotenv from "dotenv"
import connectToDB from "./db/index.js";
const port = process.env.PORT || 3000
dotenv.config({
    path:"./.env"
})
connectToDB()
.then(()=>{
    app.listen(port,()=>{
        console.log("server listen on port ",port);
    })
})
.catch((error)=>{
    console.log("DB call connection error",error);
})
