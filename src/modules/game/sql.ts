import "server-only";

export const GET_GAME =
  "SELECT code, name, image_url, image_id, created_at, updated_at, min_player FROM games;";

export const GET_GAME_BY_ID =
  "SELECT code, name, image_url, image_id, created_at, updated_at, min_player FROM games WHERE code = $1";
