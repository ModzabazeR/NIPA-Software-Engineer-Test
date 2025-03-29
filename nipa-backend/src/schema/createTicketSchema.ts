import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
  contactInformation: z.string(),
});
