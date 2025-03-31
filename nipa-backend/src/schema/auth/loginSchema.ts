import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
  }),
});
