import express, { NextFunction, Request, Response } from "express";
import { pool } from "../config/db.connect";
import { register } from "../controller/auth.controller";

export const authRoute=express.Router()


authRoute.post("/login",(req:Request,res:Response,next:NextFunction)=>{
    
})

authRoute.post("/register", register);
