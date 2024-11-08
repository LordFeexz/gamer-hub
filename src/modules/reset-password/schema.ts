import { z } from "zod";

export const reset_password_schema = z
  .object({
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            val
          ),
        "password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "password is not equal with confirm password",
    path: ["confirmPassword"],
  });
