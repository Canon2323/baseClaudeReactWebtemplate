import { z } from "zod";

// Basic validation schemas - add more as needed
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8);

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
