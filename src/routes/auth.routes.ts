import express, { NextFunction, Request, Response } from "express";
import { pool } from "../config/db.connect";
import { register, login } from "../controller/auth.controller";
import { verifyUser } from "../middlewear/verify.token.middlewear";

export const authRoute = express.Router();

authRoute.post("/login", login);

authRoute.post("/register", register);
