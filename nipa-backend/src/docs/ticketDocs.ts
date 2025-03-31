import { resolver } from "hono-openapi/zod";
import { errorResponseSchema } from "../schema/errorReponseSchema.js";
import {
  getTicketsResponseSchema,
  createTicketResponseSchema,
  updateTicketStatusResponseSchema,
} from "../schema/tickets/ticketResponseSchema.js";

export const ticketDocs = {
  getAll: {
    description: "Get all tickets",
    responses: {
      200: {
        description: "List of all tickets",
        content: {
          "application/json": { schema: resolver(getTicketsResponseSchema) },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
    },
  },
  create: {
    description: "Create a new ticket",
    responses: {
      200: {
        description: "Ticket created successfully",
        content: {
          "application/json": { schema: resolver(createTicketResponseSchema) },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
    },
  },
  updateStatus: {
    description: "Update ticket status",
    responses: {
      200: {
        description: "Ticket status updated successfully",
        content: {
          "application/json": {
            schema: resolver(updateTicketStatusResponseSchema),
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
      404: {
        description: "Ticket not found",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
    },
  },
};
