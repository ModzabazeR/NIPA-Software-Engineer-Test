import { resolver } from "hono-openapi/zod";
import { errorResponseSchema } from "../schema/errorReponseSchema.js";
import { registerResponseSchema } from "../schema/auth/registerSchema.js";
import { loginResponseSchema } from "../schema/auth/loginSchema.js";

export const authDocs = {
  register: {
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
  },
  login: {
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
  },
};
