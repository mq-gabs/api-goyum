import { Request, Response } from "express";
import {
  validateOrder,
  validateStatus,
  validateUUID,
} from "../utils/validations";
import { EStatus, TOrder } from "../utils/types";
import { v4 } from "uuid";
import { ordersRepo, storesRepo } from "../repositories";
import { assertQuery } from "../utils/functions";

export async function createOrder(
  { body, params: { store_id } }: Request,
  res: Response
) {
  validateUUID(store_id);

  const response = validateOrder(body);

  const order: TOrder = {
    id: v4(),
    ...response,
    created_at: new Date().toJSON(),
    client_info: JSON.stringify(response.client_info),
    status: EStatus.PENDING,
    store_id,
  };

  await ordersRepo.save(order);

  res.json({ message: "Pedido realizado com sucesso!", id: order.id });
}

export async function listOrders(
  { query, body: { store_id } }: Request,
  res: Response
) {
  const q = assertQuery(query);

  const response = await ordersRepo.list(q, store_id);

  res.json(response);
}

export async function updateOrderStatus(
  { params: { id }, body: { store_id, status } }: Request,
  res: Response
) {
  validateStatus(status);

  await ordersRepo.getByIdAndStore(id, store_id);

  await ordersRepo.updateStatus(id, status);

  res.json({ message: "Pedido atualizado com sucesso!" });
}

export async function findOrderById(
  { params: { id } }: Request,
  res: Response
) {
  validateUUID(id);

  const response = await ordersRepo.getById(id, true, true);

  res.json(response);
}
