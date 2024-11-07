"use server";

import { fetch_one } from "@/database/function";
import type { PoolClient } from "pg";
import { INSERT_WALLET } from "./sql";
import { v4 } from "uuid";
import type { ReturningWallet } from "./interface";

export const insert_wallet = async (userId: string, client?: PoolClient) =>
  fetch_one<ReturningWallet>(
    INSERT_WALLET,
    [v4(), userId],
    client
  ) as Promise<ReturningWallet>;
