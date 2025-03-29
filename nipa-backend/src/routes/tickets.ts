import { Hono } from "hono";
import prisma from "../lib/prisma.js";
import { createTicketSchema } from "../schema/createTicketSchema.js";
import { zValidator } from "@hono/zod-validator";
import {
  updateStatusSchema,
  updateStatusParamsSchema,
} from "../schema/updateStatusSchema.js";

interface JwtPayload {
  id: string;
  exp: number;
}

const app = new Hono<{ Variables: JwtPayload }>();

// get all tickets
app.get("/", async (c) => {
  const tickets = await prisma.ticket.findMany();

  return c.json({
    success: true,
    data: {
      tickets,
    },
  });
});

// create a new ticket
app.post("/create", zValidator("json", createTicketSchema), async (c) => {
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
});

app.patch(
  "/:id/status",
  zValidator("json", updateStatusSchema),
  zValidator("param", updateStatusParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const { status } = c.req.valid("json");
    const jwtPayload: JwtPayload = c.get("jwtPayload");

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status, updatedBy: { connect: { id: jwtPayload.id } } },
    });

    return c.json({ success: true, data: { ticket } });
  }
);

export default app;
