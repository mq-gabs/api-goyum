import { conn } from "../database/sqlite";
import { AppError } from "../utils/app-error";
import { TList, TQuery, TStore } from "../utils/types";

export async function save(store: TStore) {
  try {
    await conn("stores").insert(store);
  } catch (error) {
    throw new AppError(500, "Erro ao criar loja", error);
  }
}

export async function list({ query, page, pageSize }: TQuery) {
  try {
    const i = conn<TStore>("stores")
      .where(conn.raw("name like ?", `%${query || ""}%`))
      .select("id", "nick", "name", "description", "email");

    const [{ total }] = await i.clone().count("id", { as: "total" });

    const stores = await i
      .clone()
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      list: stores,
      total: Number(total),
    };
  } catch (error) {
    throw new AppError(500, "Erro ao listar lojas", error);
  }
}
