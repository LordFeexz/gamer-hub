import { z } from "zod";

export const forget_password_schema = z.object({
  email: z.string().email(),
  lang: z
    .string()
    .refine((val) => ["en", "id"].includes(val))
    .default("en")
    .nullable()
    .optional(),
});
