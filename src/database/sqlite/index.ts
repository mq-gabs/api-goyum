import knex from "knex";
import { knexConfig } from "../../../knexfile";

export const conn = knex(knexConfig);
