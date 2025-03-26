import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./routes/auth.js";
import ticket from "./routes/ticket.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/auth", auth);
app.route("/ticket", ticket);

app.get(
  "/ui",
  swaggerUI({
    url: "/",
    spec: {
      openapi: "3.0.0",
      info: {
        title: "NIPA API",
        version: "1.0.0",
      },
    },
  })
);

serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
