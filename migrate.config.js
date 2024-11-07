require("dotenv/config");

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  dir: "src/database/migrations",
  migrationTable: "pg_migrations",
  fileFormat: "sql",
};
