import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/),
  description: z
    .string()
    .min(10)
    .max(500)
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/),
  contactInformation: z
    .string()
    .min(5)
    .max(200)
    .regex(/^[a-zA-Z0-9\s\-_.,!?()@]+$/),
});
