import express, { NextFunction, Request, Response } from "express";

export const ErrorHandelingMiddlewear = (
  err: {
    stack: any;
    status: number;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("pj");

  const status = err.status || 500;
  const errorMessage = err.message || "Something went wrong!!!!";

  return res.status(500).json({
    status: status,
    message: errorMessage,
    data: null,
    stacks: err.stack,
  });
};
