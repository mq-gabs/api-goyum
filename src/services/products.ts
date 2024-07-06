import { Request, Response } from "express";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateUUID,
} from "../utils/validations";
import { v4, validate } from "uuid";
import { TProduct } from "../utils/types";
import { productsRepo } from "../repositories";
import { assertQuery } from "../utils/functions";

export async function createProduct({ body }: Request, res: Response) {
  const { store_id, ...rest } = body;

  const response = validateCreateProduct(rest);
  validateUUID(store_id);

  const product: TProduct = {
    id: v4(),
    ...response,
    store_id,
    is_active: true,
  };

  await productsRepo.save(product);

  res.json({ message: "Produto criado com sucesso!" });
}

export async function listMyProducts(
  { query, body: { store_id } }: Request,
  res: Response
) {
  validateUUID(store_id);

  const q = assertQuery(query);

  const response = await productsRepo.list(q, store_id);

  res.json(response);
}

export async function listProducts(
  { query, params: { store_id } }: Request,
  res: Response
) {
  validateUUID(store_id);

  const q = assertQuery(query);

  const response = await productsRepo.list(q, store_id, true);

  res.json(response);
}

export async function updateProduct(
  { body: { store_id, ...rest }, params: { id } }: Request,
  res: Response
) {
  validateUUID(id);

  let product = await productsRepo.getByIdAndStore(id, store_id);

  const response = validateUpdateProduct(rest);

  product = {
    ...product,
    ...response,
  };

  await productsRepo.update(id, product);

  res.json({ message: "Produto atualizado com sucesso!" });
}
