"use server";

import type { DefaultResponse } from "@/interfaces";
import { reset_password_schema } from "./schema";
import { verify_token } from "@/helpers/jwt";
import { select_by_id } from "../user/action";

export const reset_password_action = async (
  {}: DefaultResponse,
  formData: FormData
): Promise<DefaultResponse> => {
  const { success, data, error } = await reset_password_schema.safeParseAsync({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    token: formData.get("token"),
  });

  if (!success)
    return {
      data: null,
      message: "validation failed",
      error: error.flatten().fieldErrors,
      code: 400,
    };

  const { id } = (() => {
    try {
      return verify_token(data.token);
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

  return { code: 200, data: null, error: null, message: "ok" };
};
