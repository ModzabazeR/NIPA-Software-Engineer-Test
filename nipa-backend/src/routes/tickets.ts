import { Hono } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { createTicketSchema } from "../schema/tickets/createTicketSchema.js";
import {
  updateStatusSchema,
  updateStatusParamsSchema,
} from "../schema/tickets/updateStatusSchema.js";
import prisma from "../config/prisma.js";
import type { JwtPayload } from "../config/types.js";
import { NotFoundError } from "../config/errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { describeRoute } from "hono-openapi";
import { authorizationHeaderSchema } from "../schema/generalSchema.js";
import { ticketDocs } from "../docs/ticketDocs.js";

const app = new Hono<{ Variables: JwtPayload }>();

// Get all tickets
app.get(
  "/",
  describeRoute(ticketDocs.getAll),
  zValidator("header", authorizationHeaderSchema),
  async (c) => {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: {
        tickets,
      },
    });
  }
);

// Create a new ticket
app.post(
  "/create",
  describeRoute(ticketDocs.create),
  zValidator("json", createTicketSchema),
  zValidator("header", authorizationHeaderSchema),
  async (c) => {
    const { title, description, contactInformation } = c.req.valid("json");
    const jwtPayload: JwtPayload = c.get("jwtPayload");

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        contactInformation,
        createdBy: { connect: { id: jwtPayload.id } },
      },
    });

    return c.json({ success: true, data: { ticket } });
  }
);

// Update ticket status
app.patch(
  "/:id/status",
  describeRoute(ticketDocs.updateStatus),
  zValidator("json", updateStatusSchema),
  zValidator("param", updateStatusParamsSchema),
  zValidator("header", authorizationHeaderSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const { status } = c.req.valid("json");
    const jwtPayload: JwtPayload = c.get("jwtPayload");

    try {
      const ticket = await prisma.ticket.update({
        where: { id },
        data: { status, updatedBy: { connect: { id: jwtPayload.id } } },
      });
      return c.json({ success: true, data: { ticket } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new NotFoundError("Ticket not found");
        }
      }
      throw error;
    }
  }
);

export default app;
