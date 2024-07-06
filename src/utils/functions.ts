import { hash } from "bcrypt";
import { TQuery } from "./types";

export async function encrypt(password: string) {
  return await hash(password, 10);
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
