import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9]+$/),
  email: z
    .string()
    .min(1)
    .email()
    .transform((val) => val.toLowerCase()),
  password: z.string().min(8).max(40),
});

export const registerResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string().email(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  }),
});
