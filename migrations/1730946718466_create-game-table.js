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
    `CREATE TABLE IF NOT EXISTS games (
            code VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            image_url VARCHAR(255) NOT NULL,
            image_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            min_player INTEGER NOT NULL DEFAULT 1 CHECK (min_player >= 1)
        );
        
        CREATE INDEX idx_games_name ON games (name);
        CREATE INDEX idx_games_code ON games (code);`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(
    `
    DROP INDEX IF EXISTS idx_games_name;
    DROP INDEX IF EXISTS idx_games_code;
    DROP TABLE IF EXISTS games;
    `
  );
};
