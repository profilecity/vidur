import { z } from 'zod';

export const passwordSchema = z
  .string()
  .regex(/^.{8,}$/, 'Password must be at least 8 characters long.')
  .regex(/(?=(.*[!@#$%^&*()\-__+.]){1,})/, 'Password must contain at least 1 special character.');

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  email: z.string().email(),
  password: passwordSchema,
});
