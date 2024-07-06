import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (t) => {
    t.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    t.uuid("store_id").references("id").inTable("stores").notNullable();
    t.jsonb("client_info").notNullable();
    t.text("observations");
    t.enum("status", ["pending", "making", "delivery", "done", "cancelled"]);
    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
