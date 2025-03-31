import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1)
    .email()
    .transform((val) => val.toLowerCase()),
  password: z.string().min(8).max(40),
});

export const loginResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
  }),
});
