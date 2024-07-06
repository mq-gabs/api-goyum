import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

export function errorHandler(
  err: ErrorRequestHandler,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.log({ err });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
