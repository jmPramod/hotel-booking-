import express, { NextFunction, Request, Response } from "express";

export const authRoute=express.Router()
authRoute.post("/login",(req:Request,res:Response,next:NextFunction)=>{
    
})