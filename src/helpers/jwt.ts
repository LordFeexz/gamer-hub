import { type JwtPayload, sign, verify, type SignOptions } from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";

export interface TokenPayload {
  id: string;
  is_admin: boolean;
}

export type TokenValue = JwtPayload & TokenPayload;

export const verify_token = (token: string): TokenValue =>
  verify(token, process.env.SECRET) as TokenValue;

export const create_token = (payload: TokenPayload): string =>
  sign(payload, process.env.SECRET);

export const custom_verify = (
  token: string | undefined,
  secret: string | Buffer
): JwtPayload | string | JWT =>
  verify(token as string, secret, { algorithms: ["HS256"] });

export const custom_token = (
  token: string | JWT,
  secret: string | Buffer
): string => sign(token as string, secret, { algorithm: "HS256" });
