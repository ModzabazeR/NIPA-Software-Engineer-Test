import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema } from "../schema/registerSchema.js";
import prisma from "../lib/prisma.js";
import * as argon2 from "argon2";
import { loginSchema } from "../schema/loginSchema.js";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono();

app.post("/register", zValidator("json", registerSchema), async (c) => {
  const { username, email, password } = c.req.valid("json");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return c.json(
      {
        success: false,
        error: {
          name: "UserAlreadyExists",
          message: "User already exists",
        },
      },
      400
    );
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return c.json({
    success: true,
    data: {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    },
  });
});

app.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return c.json(
      {
        success: false,
        error: {
          name: "InvalidCredentials",
          message: "Invalid email or password",
        },
      },
      400
    );
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    return c.json(
      {
        success: false,
        error: {
          name: "InvalidCredentials",
          message: "Wrong email or password",
        },
      },
      400
    );
  }

  // TODO: generate jwt token
  const jwtPayload = {
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };
  const token = await sign(jwtPayload, process.env.JWT_SECRET!);

  return c.json({
    success: true,
    data: {
      token,
    },
  });
});

export default app;
