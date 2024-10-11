import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/user.routes.js";
import cors from 'cors';
const app=express()
app.use(bodyParser.json())

dotenv.config()
app.use(cors('*'))
const PORT= process.env.PORT||8000
const mongoURL=process.env.MONGO_URL
mongoose.connect(mongoURL)
.then((d)=>{console.log("database connected successfully")
    app.listen(PORT,()=>{
    console.log("server is listening at port:",PORT)
    })
})
.catch((e)=>console.log(e.message))
app.use("/api/v1/user",route)