import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stores", (t) => {
    t.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    t.text("nick").notNullable().unique();
    t.text("name").notNullable();
    t.text("description").notNullable();
    t.text("email").unique().notNullable();
    t.text("password").notNullable();
    t.text("scheduling").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("stores");
}
