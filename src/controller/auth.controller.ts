import express, { NextFunction, Request, Response } from "express";
import { pool } from "../config/db.connect";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
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
        user_secondName,
        user_email,
        user_phone,
        user_password,
        user_role,
        cloudinaryPublicId,
        user_address,
        user_pinCode,
      ]
    );

    return res.status(201).json({
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    next(error);
  }
};

export { register };
