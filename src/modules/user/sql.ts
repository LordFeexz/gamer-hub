import "server-only";

export const INSERT_USER = `INSERT INTO users
(id, username, password, email, is_verified)
VALUES
($1, $2, $3, $4, $5)
RETURNING id, username, email, is_verified;`;

export const SELECT_USER_LOGIN =
  "SELECT id, username, email, password FROM users WHERE username = $1 OR email = $1;";

export const SELECT_EXISTING_USER =
  "SELECT id, username, email FROM users WHERE username = $1 OR email = $2;";
