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
    `CREATE TABLE IF NOT EXISTS team_achievements (
            id SERIAL PRIMARY KEY NOT NULL,
            achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE SET NULL ON UPDATE SET NULL,
            team_id UUID NOT NULL REFERENCES teams(id) ON DELETE SET NULL ON UPDATE SET NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        
        CREATE INDEX idx_team_achievements_achievement_id ON team_achievements (achievement_id);
        CREATE INDEX idx_team_achievements_team_id ON team_achievements (team_id);
        `
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
    DROP INDEX IF EXISTS idx_team_achievements_achievement_id;
    DROP INDEX IF EXISTS idx_team_achievements_team_id;
    DROP TABLE IF EXISTS team_achievements;`
  );
};
