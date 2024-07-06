import {} from "knex";
import path from "path";

export default {
  client: "sqlite3",
  connection: {
    filename: path.resolve("src", "database", "sqlite", "database.db"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
