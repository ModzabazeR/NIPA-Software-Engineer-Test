import { z } from "zod";
import {
  ticketSchema,
  ticketWithoutRelationsSchema,
} from "../generalSchema.js";

export const getTicketsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    tickets: z.array(ticketSchema),
  }),
});

export const createTicketResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    ticket: ticketWithoutRelationsSchema,
  }),
});

export const updateTicketStatusResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    ticket: ticketWithoutRelationsSchema,
  }),
});
