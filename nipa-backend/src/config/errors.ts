import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends HTTPException {
  constructor(message: string, status: ContentfulStatusCode = 500) {
    super(status, {
      message,
    });
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User already exists", 400);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid email or password", 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}
