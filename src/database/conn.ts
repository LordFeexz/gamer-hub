import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  query_timeout: 30000,
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  keepAlive: true,
  ssl:
    process.env.NODE_ENV === "production"
      ? undefined
      : { rejectUnauthorized: false },
});

export default pool;
