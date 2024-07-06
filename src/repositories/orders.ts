import { productsRepo } from ".";
import { conn } from "../database/sqlite";
import { AppError } from "../utils/app-error";
import { EStatus, TOrder, TProduct, TQuery } from "../utils/types";

export async function save({ products, ...order }: TOrder) {
  try {
    await conn<TOrder>("orders").insert(order);

    const orderProducts = products.map(({ id, quantity }) => ({
      order_id: order.id,
      product_id: id,
      quantity,
    }));

    await conn("orders_products").insert(orderProducts);
  } catch (error) {
    throw new AppError(500, "Erro ao criar pedido!", error);
  }
}

export async function list(
  { status, page, pageSize }: TQuery,
  store_id: string
) {
  try {
    const i = conn<TOrder>("orders").where({ store_id });

    if (status) {
      i.andWhere({ status });
    }

    const [{ total }] = await i.clone().count("id", { as: "total" });

    const orders = await i
      .clone()
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      list: orders,
      total: Number(total),
    };
  } catch (error) {
    throw new AppError(500, "Erro ao listar pedidos", error);
  }
}

export async function getById(id: string, withProducts: boolean = false) {
  try {
    const response = await conn<TOrder>("orders").where({ id }).first();

    if (!response) {
      throw new AppError(404, "Pedido não encontrado!");
    }

    if (withProducts) {
      const orderProducts = await conn("orders_products").where({
        order_id: id,
      });

      const productsIds = orderProducts.map(({ product_id }) => product_id);

      const products = (await productsRepo.getByIds(productsIds)).map(
        (product) => {
          const orderProduct = orderProducts.find(
            ({ product_id }) => product_id === product.id
          );

          return {
            ...product,
            quantity: orderProduct.quantity,
          };
        }
      );

      const total_price = products.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);

      return {
        ...response,
        products,
        total_price,
      };
    }

    return response;
  } catch (error) {
    throw new AppError(500, "Erro ao buscar pedido!", error);
  }
}

export async function getByIdAndStore(id: string, store_id: string) {
  try {
    const response = await conn<TOrder>("orders")
      .where({ id, store_id })
      .first();

    if (!response) {
      throw new AppError(404, "Pedido não encontrado!");
    }

    return response;
  } catch (error) {
    throw new AppError(500, "Erro ao buscar pedido!", error);
  }
}

export async function updateStatus(id: string, status: EStatus) {
  try {
    await conn<TOrder>("orders")
      .update({
        status,
      })
      .where({ id });
  } catch (error) {
    throw new AppError(500, "Erro ao atualizar status do pedido", error);
  }
}
