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
    `CREATE TYPE team_role AS ENUM ('owner', 'member', 'coach', 'inspector', 'manager', 'admin');

    CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY NOT NULL,
        team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE ON UPDATE CASCADE,
        status BOOLEAN DEFAULT FALSE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        role team_role NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member', 'coach', 'inspector', 'manager', 'admin'))
    );

    CREATE INDEX idx_team_members_team_id ON team_members (team_id);
    CREATE INDEX idx_team_members_user_id ON team_members (user_id);`
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
    DROP INDEX IF EXISTS idx_team_members_team_id;
    DROP INDEX IF EXISTS idx_team_members_user_id;
    DROP TABLE IF EXISTS team_members;
    `
  );
};
