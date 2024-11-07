/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(
    `
        CREATE TYPE roles AS ENUM ('Supervisor', 'Manager', 'Staff');
        CREATE TYPE divisions AS ENUM ('Director','Finance','IT','Third Party','Customer Service','Marketing');

        CREATE TABLE IF NOT EXISTS admins (
            id UUID PRIMARY KEY NOT NULL,
            fullname VARCHAR NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            division divisions CHECK (division IN ('Director','Finance','IT','Third Party','Customer Service','Marketing')), 
            role roles CHECK (role IN ('Supervisor', 'Manager', 'Staff')) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS admins;");
};
