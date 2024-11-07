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
    `CREATE TABLE IF NOT EXISTS user_achievements (
            id SERIAL PRIMARY KEY NOT NULL,
            achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE SET NULL ON UPDATE SET NULL,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL ON UPDATE SET NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        
        CREATE INDEX idx_user_achievements_achievement_id ON user_achievements (achievement_id);
        CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);
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
    DROP INDEX IF EXISTS idx_user_achievements_achievement_id;
    DROP INDEX IF EXISTS idx_user_achievements_user_id;
    DROP TABLE IF EXISTS user_achievements;`
  );
};
