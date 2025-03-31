import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
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
