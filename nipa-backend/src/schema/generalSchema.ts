import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ticketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  contactInformation: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: userSchema,
  updatedBy: userSchema,
});

export const ticketWithoutRelationsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  contactInformation: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authorizationHeaderSchema = z.object({
  Authorization: z.string().startsWith("Bearer "),
});
