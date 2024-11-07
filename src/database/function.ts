import pool from "./conn";
import { type PoolClient, type QueryResultRow, type Pool } from "pg";

type IsolationLevel =
  | "READ UNCOMMITTED"
  | "READ COMMITTED"
  | "REPEATABLE READ"
  | "SERIALIZABLE";

export const query = async <T extends QueryResultRow>(
  sql: string,
  values: any[],
  fetcher: Pool | PoolClient = pool
) => await fetcher.query<T>(sql, values);

export const fetch_one = async <T extends QueryResultRow>(
  sql: string,
  values: any[],
  fetcher: Pool | PoolClient = pool
): Promise<T | null> =>
  (await query<T>(sql, values, fetcher))?.rows?.[0] ?? null;

export const get_client = async () => pool.connect();

export const transaction = async <T = any>(
  callback: (client: PoolClient) => Promise<T>,
  isolationLevel: IsolationLevel = "READ COMMITTED"
) => {
  const client = await get_client();
  await client.query(`BEGIN ISOLATION LEVEL ${isolationLevel}`);
  try {
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
};
