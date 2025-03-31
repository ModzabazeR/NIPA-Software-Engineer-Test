import { Hono } from "hono";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import {
  registerSchema,
  registerResponseSchema,
} from "../schema/auth/registerSchema.js";
import {
  loginSchema,
  loginResponseSchema,
} from "../schema/auth/loginSchema.js";
import { sign } from "hono/jwt";
import prisma from "../config/prisma.js";
import * as argon2 from "argon2";
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
} from "../utils/errors.js";
import { describeRoute } from "hono-openapi";
import { errorResponseSchema } from "../schema/errorReponseSchema.js";

const app = new Hono();

app.post(
  "/register",
  describeRoute({
    description: "Create a new account",
    responses: {
      200: {
        description: "User created successfully",
        content: {
          "application/json": { schema: resolver(registerResponseSchema) },
        },
      },
      400: {
        description: "User already exists",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
    },
  }),
  zValidator("json", registerSchema),
  async (c) => {
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
  }
);

app.post(
  "/login",
  describeRoute({
    description: "Login to your account",
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: resolver(loginResponseSchema),
          },
        },
      },
      400: {
        description: "Invalid credentials",
        content: {
          "application/json": { schema: resolver(errorResponseSchema) },
        },
      },
    },
  }),
  zValidator("json", loginSchema),
  async (c) => {
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
  }
);

export default app;
