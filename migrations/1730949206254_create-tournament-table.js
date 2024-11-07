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
    `CREATE TYPE tournament_status AS ENUM ('preparation', 'ongoing', 'completed', 'cancelled');

        CREATE TABLE IF NOT EXISTS tournaments (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            game_code VARCHAR NOT NULL REFERENCES games(code) ON DELETE CASCADE ON UPDATE CASCADE,
            price_pool DECIMAL(15, 2) NOT NULL CHECK (price_pool > 0),
            slot INTEGER NOT NULL CHECK (slot > 0),
            start_date TIMESTAMP NOT NULL,
            registration_fee DECIMAL(15, 2) NOT NULL CHECK (registration_fee > 0),
            description TEXT DEFAULT NULL,
            status tournament_status CHECK (status IN ('preparation', 'ongoing', 'completed', 'cancelled')) NOT NULL DEFAULT 'preparation',
            image_url VARCHAR NOT NULL,
            image_id VARCHAR NOT NULL,
            location VARCHAR NOT NULL,
            tags TEXT[] NOT NULL DEFAULT '{}', 
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            user_id UUID DEFAULT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            live_on VARCHAR DEFAULT NULL,
            is_public BOOLEAN NOT NULL DEFAULT TRUE,
            money_pool DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (money_pool >= 0)
        );

        CREATE INDEX idx_tournaments_game_code ON tournaments (game_code);
        CREATE INDEX idx_tournaments_user_id ON tournaments (user_id);
`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
    DROP INDEX IF EXISTS idx_tournaments_game_code;
    DROP INDEX IF EXISTS idx_tournaments_user_id;
    DROP TABLE IF EXISTS tournaments;
    `);
};
