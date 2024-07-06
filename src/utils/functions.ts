import { hash, compare } from "bcrypt";
import { TQuery } from "./types";
import auth from "../config/auth";
import { sign } from "jsonwebtoken";

export async function encrypt(password: string) {
  return await hash(password, 10);
}

export async function checkPassword(trueP: string, incomingP: string) {
  return await compare(incomingP, trueP);
}

export function assertQuery(data: any): TQuery {
  if (!data.page || typeof data.page !== "number") {
    data.page = 0;
  }
  if (!data.pageSize || typeof data.pageSize !== "number") {
    data.pageSize = 10;
  }

  return data as TQuery;
}

export function genToken(id: string) {
  const { secret, expiresIn } = auth.jwt;

  const token = sign({}, secret, {
    subject: id,
    expiresIn,
  });

  return token;
}
