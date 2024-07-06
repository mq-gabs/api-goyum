import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { AppError } from "../utils/app-error";
import { NextFunction, Request, Response } from "express";

export function ensureAuth(req: Request, _: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(400, "JWT token not informed");
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, auth.jwt.secret);

    req.body.store_id = sub;

    return next();
  } catch (error) {
    console.log(error);
    throw new AppError(403, "JWT é inválido!");
  }
}
