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
        CREATE TYPE transaction_status AS ENUM (
            'pending',
            'completed',
            'failed',
            'cancel',
            'refund',
            'settlement',
            'deny',
            'expire'
        );

        CREATE TYPE transaction_type AS ENUM (
            'topup','payment','refund','settlement'
        );

        CREATE TYPE supported_currency AS ENUM (
            'USD',
            'IDR'
        );

        CREATE TABLE IF NOT EXISTS transactions (
            id UUID PRIMARY KEY NOT NULL,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            amount FLOAT NOT NULL,
            transaction_type transaction_type NOT NULL CHECK (transaction_type IN ('topup', 'payment', 'refund', 'settlement')),
            currency supported_currency NOT NULL DEFAULT 'IDR' CHECK (currency IN ('USD', 'IDR')),
            status transaction_status NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancel', 'refund', 'settlement', 'deny', 'expire')),
            description TEXT,
            detail TEXT,
            signature VARCHAR NOT NULL,
            discount FLOAT NOT NULL DEFAULT 0,
            fee FLOAT NOT NULL,
            tax FLOAT DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE INDEX idx_transactions_user_id ON transactions (user_id);
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
    DROP INDEX IF EXISTS idx_transactions_user_id;
    DROP TABLE IF EXISTS transactions;
    `);
};
