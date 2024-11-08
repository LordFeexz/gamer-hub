"use server";

import type { DefaultResponse } from "@/interfaces";
import { forget_password_schema } from "./schema";
import mailer from "@/lib/nodemailer";
import { get_user_login, select_by_id } from "../user/action";
import { create_token, verify_token } from "@/helpers/jwt";
import { redirect } from "next/navigation";

export const forget_password_action = async (
  {}: DefaultResponse,
  formData: FormData
): Promise<DefaultResponse> => {
  const token = formData.get("token");
  let email = formData.get("email");
  if (token && typeof token === "string") {
    const { id } = (() => {
      try {
        return verify_token(token);
      } catch (err) {
        return {
          id: null,
        };
      }
    })();

    if (!id)
      return {
        code: 401,
        message: "invalid token",
        error: null,
        data: null,
      };

    const user = await select_by_id(id);
    if (!user)
      return {
        code: 404,
        message: "user not found",
        error: null,
        data: null,
      };

    email = user.email;
  }

  const { success, error, data } = await forget_password_schema.safeParseAsync({
    email,
    lang: formData.get("lang") ?? "en",
  });

  if (!success)
    return {
      code: 400,
      message: "validation failed",
      error: error.flatten().fieldErrors,
      data: null,
    };

  const user = await get_user_login(data.email);
  if (!user)
    return {
      code: 400,
      message: "user not found",
      error: null,
      data: null,
    };

  mailer.send_forgot_password_mail(
    data.email,
    (data.lang as "en" | "id") ?? "en",
    create_token({ id: user.id, is_admin: false })
  );

  redirect("/auth/reset-password");
};
