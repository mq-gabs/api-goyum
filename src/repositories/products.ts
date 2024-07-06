import { conn } from "../database/sqlite";
import { AppError } from "../utils/app-error";
import { TProduct, TQuery } from "../utils/types";

export async function save(product: TProduct) {
  try {
    await conn("products").insert(product);
  } catch (error) {
    throw new AppError(500, "Erro ao criar produto");
  }
}

export async function list(
  { query, page, pageSize }: TQuery,
  store_id: string,
  onlyActive: boolean = false
) {
  try {
    const i = conn<TProduct>("products")
      .where({ store_id })
      .andWhere(conn.raw("name like ?", `%${query || ""}%`));

    if (onlyActive) {
      i.andWhere({ is_active: true });
    }

    const [{ total }] = await i.clone().count("id", { as: "total" });

    const products = await i
      .clone()
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      list: products,
      total: Number(total),
    };
  } catch (error) {
    throw new AppError(500, "Erro ao listar produtos", error);
  }
}

export async function getById(id: string) {
  try {
    const response = await conn<TProduct>("products").where({ id }).first();

    if (!response) throw new AppError(404, "Produto não encontrado");

    return response;
  } catch (error) {
    throw new AppError(500, "Erro ao buscar produto!", error);
  }
}

export async function getByIdAndStore(id: string, store_id: string) {
  try {
    const response = await conn<TProduct>("products")
      .where({ id, store_id })
      .first();

    if (!response) throw new AppError(404, "Produto não encontrado");

    return response;
  } catch (error) {
    throw new AppError(500, "Erro ao buscar produto!", error);
  }
}

export async function update(
  id: string,
  { name, is_active, price, description }: Partial<TProduct>
) {
  try {
    await conn<TProduct>("products")
      .update({
        name,
        description,
        price,
        is_active,
      })
      .where({ id });
  } catch (error) {
    throw new AppError(500, "Erro ao atualizar produto!", error);
  }
}
