import { z } from "zod";

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    name: z.string(),
    message: z.string(),
  }),
});
