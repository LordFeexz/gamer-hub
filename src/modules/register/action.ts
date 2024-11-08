"use server";

import type { DefaultResponse } from "@/interfaces";
import { register_schema } from "./schema";
import { insert_user, select_existing_user } from "../user/action";
import { transaction } from "@/database/function";
import { hash_data } from "@/helpers/bcrypt";
import { insert_wallet } from "../wallet/action";
import { redirect } from "next/navigation";
import mailer from "@/lib/nodemailer";
import { create_token } from "@/helpers/jwt";
import type { InsertUser } from "../user/interface";

export const register_action = async (
  {}: DefaultResponse,
  formData: FormData
): Promise<DefaultResponse> => {
  const { data, success, error } = await register_schema.safeParseAsync({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!success)
    return {
      message: "validation failed",
      data: null,
      error: error.flatten().fieldErrors,
      code: 400,
    };

  if (data.password !== data.confirmPassword)
    return {
      message: "validation failed",
      data: null,
      error: {
        confirmPassword: ["password and confirmPassword must be equal"],
      },
      code: 400,
    };

  const exists = await select_existing_user({
    username: data.username || "",
    email: data.email || "",
  });
  if (exists.length)
    for (const { username, email } of exists) {
      if (username === data.username)
        return {
          message: "username is already exists",
          data: null,
          error: null,
          code: 409,
        };

      if (email === data.email)
        return {
          message: "email is already exists",
          data: null,
          error: null,
          code: 409,
        };
    }

  const user = await transaction<any>(async (client) => {
    const inserted = await insert_user(
      {
        is_verified: false,
        username: data.username,
        email: data.email,
        password: await hash_data(data.password),
      },
      client
    );

    await insert_wallet(inserted.id, client);

    return insert_user;
  }, "READ UNCOMMITTED");

  mailer.send_confirm_mail(
    data.email,
    create_token({
      id: (user as unknown as InsertUser & { id: string }).id,
      is_admin: false,
    })
  );
  redirect(
    `/auth/login?${new URLSearchParams({
      identifier: data.email,
      password: data.password,
    }).toString()}`
  );
};
