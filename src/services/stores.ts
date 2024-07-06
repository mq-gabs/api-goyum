import { Request, Response } from "express";
import { validateCreateStore } from "../utils/validations";
import { TStore } from "../utils/types";
import { v4 } from "uuid";
import { storesRepo } from "../repositories";
import { assertQuery, encrypt } from "../utils/functions";

export async function createStore({ body }: Request, res: Response) {
  const response = validateCreateStore(body);

  const store: TStore = {
    id: v4(),
    ...response,
    scheduling: JSON.stringify(response.scheduling),
    password: await encrypt(response.password),
  };

  await storesRepo.save(store);

  res.json({ message: "Loja criada com sucesso" });
}

export async function listStores({ query }: Request, res: Response) {
  const q = assertQuery(query);

  const response = await storesRepo.list(q);

  res.json(response);
}
