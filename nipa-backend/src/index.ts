import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./routes/auth.js";
import tickets from "./routes/tickets.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import type { JwtPayload } from "./config/types.js";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";

const app = new Hono<{ Variables: JwtPayload }>();

// Middleware
app.use("*", logger());
app.use("*", cors());
app.use("/tickets/*", authMiddleware);

// Routes
app.get("/", (c) => {
  return c.text("API is running");
});

app.route("/auth", auth);
app.route("/tickets", tickets);

app.get(
  "/docs",
  apiReference({
    theme: "kepler",
    url: "/openapi",
  })
);

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono.js",
        version: "1.0.0",
        description: "Ticket Management API",
      },
      servers: [{ url: "http://localhost:8787", description: "Local Server" }],
    },
  })
);

// Error handling
app.onError((err, c) => {
  console.error(err);
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          name: err.name,
          message: err.message,
        },
      },
      err.status
    );
  } else {
    return c.json(
      {
        success: false,
        error: {
          name: "InternalServerError",
          message: "An error occurred",
        },
      },
      500
    );
  }
});

// Start server
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
