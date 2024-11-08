import { z } from "zod";

export const forget_password_schema = z.object({
  email: z.string().email(),
  lang: z
    .string()
    .default("")
    .refine((val) => ["en", "id"].includes(val))
    .nullable()
    .optional(),
});
