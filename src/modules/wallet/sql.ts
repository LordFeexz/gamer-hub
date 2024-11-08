import "server-only";
export const INSERT_WALLET = `INSERT INTO wallets (
    id, user_id
) VALUES (
    $1, $2
) RETURNING id;`;
