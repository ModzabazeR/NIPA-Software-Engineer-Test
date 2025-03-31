import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema } from "../schema/registerSchema.js";
import { loginSchema } from "../schema/loginSchema.js";
import { sign } from "hono/jwt";
import prisma from "../config/prisma.js";
import * as argon2 from "argon2";
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
} from "../utils/errors.js";

const app = new Hono();

app.post("/register", zValidator("json", registerSchema), async (c) => {
  const { username, email, password } = c.req.valid("json");

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (user) {
    throw new UserAlreadyExistsError();
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
    throw new InvalidCredentialsError();
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }

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
