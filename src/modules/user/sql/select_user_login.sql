SELECT id, username, email, password FROM users WHERE username = $1 OR email = $1;