import express, { NextFunction, Request, Response } from "express";
import { pool } from "../config/db.connect";
import { registerValidation } from "../validations/auth.validation";
import createError from "../middlewear/error.middlewear";
import { ValidationError } from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error }: { error?: ValidationError } = registerValidation.validate(
      req.body
    );
    if (error) {
      console.log(error);

      return next(createError(404, error.details[0].message));
    }
    let {
      user_name,
      user_secondName,
      user_email,
      user_phone,
      user_password,
      user_role,
      cloudinaryPublicId,
      user_address,
      user_pinCode,
    } = req.body;

    user_password = await bcrypt.hash(req.body.user_password, 10);
    const result = await pool.query(
      `
            INSERT INTO users (  
                user_name, 
                user_secondName, 
                user_email, 
                user_phone, 
                user_password, 
                user_role, 
                cloudinaryPublicId, 
                user_address, 
                user_pinCode, 
                createdAt, 
                updatedAt
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT) 
            RETURNING *
        `,
      [
        user_name,
        user_secondName || "",
        user_email,
        user_phone,
        user_password,
        user_role || "user",
        cloudinaryPublicId || "",
        user_address || "",
        user_pinCode,
      ]
    );
    const token = jwt.sign(
      { email: user_email, id: result.rows[0].id },
      process.env.SECRET_KEY as string
    );
    return res.status(201).json({
      message: "User created successfully",
      data: result.rows[0],
      token: token,
    });
  } catch (error: any) {
    console.log(error);

    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE user_email = $1 OR user_phone = $2`,
      [req.body.user_email || null, req.body.user_email || null]
    );
    if (result.rows.length === 0) {
      return next(createError(404, "This email does not exist"));
    }
    if (!req.body.user_password) {
      return next(createError(404, "Password is missing."));
    }
    const decryptPassword = await bcrypt.compare(
      req.body.user_password,
      result.rows[0].user_password
    );

    if (!decryptPassword) {
      return next(createError(404, "Password is incorrect"));
    }
    const token = jwt.sign(
      { email: req.body.user_email, id: result.rows[0].id },
      process.env.SECRET_KEY as string
    );

    return res.status(201).json({
      message: "User Logged in  successfully",
      data: result.rows[0],
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
export { register, login };
