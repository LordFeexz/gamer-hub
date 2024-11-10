"use server";

import { fetch_one, query } from "@/database/function";
import type { PoolClient } from "pg";
import { GET_GAME, GET_GAME_BY_ID } from "./sql";
import type { GameData } from "./interface";

export const get_games = async (client?: PoolClient) =>
  query<GameData>(GET_GAME, [], client);

export const get_game_by_id = async (code: string, client?: PoolClient) =>
  fetch_one(GET_GAME_BY_ID, [code], client);
