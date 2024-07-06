import { Request, Response } from "express";
import { storesRepo } from "../repositories";
import { validateCredentials } from "../utils/validations";
import { AppError } from "../utils/app-error";
import { checkPassword, genToken } from "../utils/functions";

export async function signIn({ body }: Request, res: Response) {
  const response = validateCredentials(body);

  const store = await storesRepo.getStoreByEmail(response.email);

  const check = await checkPassword(store.password, response.password);

  if (!check) {
    throw new AppError(401, "Email e/ou senha incorretos!");
  }

  const token = genToken(store.id);

  res.json({
    id: store.id,
    name: store.name,
    description: store.description,
    nick: store.nick,
    email: store.email,
    token,
  });
}
