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
    `CREATE TABLE IF NOT EXISTS achievements (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            description TEXT,
            image_url VARCHAR NOT NULL,
            image_id VARCHAR NOT NULL,
            game_code VARCHAR REFERENCES games(code) ON DELETE SET NULL ON UPDATE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS achievements;");
};
