import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (t) => {
    t.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    t.text("name").notNullable();
    t.text("description").notNullable();
    t.uuid("store_id").references("id").inTable("store");
    t.integer("price").notNullable();
    t.boolean("is_active");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
