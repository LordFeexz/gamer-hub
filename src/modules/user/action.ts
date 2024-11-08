"use server";

import { fetch_one, query } from "@/database/function";
import {
  INSERT_USER,
  SELECT_EXISTING_USER,
  SELECT_USER_BY_ID,
  SELECT_USER_LOGIN,
  UPDATE_USER_PASSWORD,
} from "./sql";
import type { InsertUser, UserLoginPayload } from "./interface";
import type { PoolClient } from "pg";
import { v4 } from "uuid";

export const get_user_login = async (identifier: string, client?: PoolClient) =>
  fetch_one<UserLoginPayload>(SELECT_USER_LOGIN, [identifier], client);

export const insert_user = async (
  { is_verified, username, email, password }: InsertUser,
  client?: PoolClient
) =>
  fetch_one<Omit<InsertUser, "password"> & { id: string }>(
    INSERT_USER,
    [v4(), username, password, email, is_verified],
    client
  ) as Promise<Omit<InsertUser, "password"> & { id: string }>;

export const select_existing_user = async (
  { username, email }: Pick<UserLoginPayload, "email" | "username">,
  client?: PoolClient
) =>
  query<Omit<UserLoginPayload, "is_verified">>(
    SELECT_EXISTING_USER,
    [username, email],
    client
  );

export const select_by_id = async (id: string, client?: PoolClient) =>
  fetch_one<UserLoginPayload>(SELECT_USER_BY_ID, [id], client);

export const update_password_by_id = async (
  id: string,
  password: string,
  client?: PoolClient
) => fetch_one(UPDATE_USER_PASSWORD, [password, id], client);
