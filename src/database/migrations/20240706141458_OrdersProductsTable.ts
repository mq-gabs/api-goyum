import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders_products", (t) => {
    t.uuid("order_id").references("id").inTable("orders").notNullable();
    t.uuid("product_id").references("id").inTable("products").notNullable();
    t.integer("quantity").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders_products");
}
