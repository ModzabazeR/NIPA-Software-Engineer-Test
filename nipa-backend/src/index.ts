import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./routes/auth.js";
import ticket from "./routes/tickets.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

app.use("*", logger());
app.use("*", cors());
app.use("/ticket/*", (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET!,
  });
  return jwtMiddleware(c, next);
});

app.get("/", (c) => {
  return c.text("API is running");
});

app.route("/auth", auth);
app.route("/ticket", ticket);

serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);

    if (!process.env.JWT_SECRET) {
      console.warn("[WARNING] JWT_SECRET is not set");
    }
  }
);
