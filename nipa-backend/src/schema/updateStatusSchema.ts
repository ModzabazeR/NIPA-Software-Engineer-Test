import { TicketStatus } from "@prisma/client";
import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.nativeEnum(TicketStatus),
});

export const updateStatusParamsSchema = z.object({
  id: z.string(),
});
