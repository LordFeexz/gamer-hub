INSERT INTO users
    (id, username, password, email, is_verified)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING id, username, email, is_verified;