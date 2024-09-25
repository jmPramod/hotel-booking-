
import express from "express"
import cors from 'cors';
import morgan from 'morgan';
import { authRoute } from "./routes/auth.routes";
import { connectDataBase } from "./config/db.connect";
import dotenv from "dotenv"
dotenv.config()
const app=express()
const runServer=()=>{
//!middlewear

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({origin: '*', credentials: true}));
app.use("/",authRoute)
connectDataBase()

}


export {runServer,app}