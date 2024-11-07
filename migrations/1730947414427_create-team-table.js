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
    `CREATE TABLE IF NOT EXISTS teams (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL UNIQUE,
        owner UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        image_url VARCHAR,
        image_id VARCHAR,
        game_code VARCHAR NOT NULL REFERENCES games(code) ON DELETE CASCADE ON UPDATE CASCADE,
        is_public BOOLEAN NOT NULL DEFAULT TRUE,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        total_member INTEGER NOT NULL DEFAULT 1,
        max_member INTEGER NOT NULL DEFAULT 10
    );`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS teams;`);
};
