import express, { NextFunction, Request, Response } from "express";
import { pool } from "../config/db.connect";
import { registerValidation } from "../validations/auth.validation";
import createError from "../middlewear/error.middlewear";
import { ValidationError } from "joi";
import bcrypt from "bcryptjs";
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

    return res.status(201).json({
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);

    next(error);
  }
};

export { register };
