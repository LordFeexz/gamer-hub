"use server";

import type { DefaultResponse } from "@/interfaces";
import { get_user_login, insert_user } from "../user/action";
import { compare_data } from "@/helpers/bcrypt";
import { create_token } from "@/helpers/jwt";
import { login_schema } from "./schema";
import { verifyIdToken } from "@/third-party/google";
import type { TokenPayload } from "google-auth-library";
import { transaction } from "@/database/function";
import type { UserLoginPayload } from "../user/interface";
import { generate_random_number } from "@/helpers/global";
import { insert_wallet } from "../wallet/action";

export async function login_action(
  {}: DefaultResponse<any>,
  formData: FormData
): Promise<DefaultResponse<string>> {
  const { success, data, error } = await login_schema.safeParseAsync({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!success)
    return {
      message: "validation failed",
      data: null,
      error: error.flatten().fieldErrors,
      code: 400,
    };

  const user = await get_user_login(data.identifier ?? "");
  if (!user || !(await compare_data(data.password, user.password)))
    return {
      message: "invalid credentials",
      data: null,
      error: null,
      code: 401,
    };

  return {
    message: "ok",
    data: create_token({ id: user.id, is_admin: false }),
    error: null,
    code: 200,
  };
}

export async function google_login_action(
  token: string
): Promise<DefaultResponse<string>> {
  if (!token)
    return {
      code: 401,
      message: "invalid credentials",
      data: null,
      error: null,
    };

  const ticket = await verifyIdToken(token);
  const { email, email_verified, given_name } =
    ticket.getPayload() as TokenPayload;

  if (!email || !email_verified || !given_name)
    return {
      code: 401,
      message: "invalid credentials",
      data: null,
      error: null,
    };

  const user = await transaction<UserLoginPayload | null>(async (client) => {
    let payload = await get_user_login(email, client);
    if (!payload) {
      const newUser = await insert_user(
        {
          email,
          is_verified: email_verified,
          username: given_name + "-" + generate_random_number(4),
          password: "GOOGLE_OAUTH",
        },
        client
      );

      await insert_wallet(newUser.id, client);
      payload = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        password: "GOOGLE_OAUTH",
      };
    }
    return payload;
  }, "READ UNCOMMITTED");
  if (!user)
    return {
      code: 401,
      message: "invalid credentials",
      data: null,
      error: null,
    };

  return {
    code: 200,
    message: "ok",
    data: create_token({
      id: (user as UserLoginPayload).id,
      is_admin: false,
    }),
    error: null,
  };
}
