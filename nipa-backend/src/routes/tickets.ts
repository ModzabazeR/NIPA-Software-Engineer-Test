import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const app = new Hono();

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

export default app;
