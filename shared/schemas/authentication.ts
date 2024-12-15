import { z } from 'zod';

export const passwordSchema = z
  .string()
  .regex(/^.{8,}$/, 'Password must be at least 8 characters long.')
  .regex(/(?=(.*[a-z]){3,})/, 'Password must contain at least 3 lowercase letters.')
  .regex(/(?=(.*[A-Z]){2,})/, 'Password must contain at least 2 uppercase letters.')
  .regex(/(?=(.*[0-9]){2,})/, 'Password must contain at least 2 numbers.')
  .regex(/(?=(.*[!@#$%^&*()\-__+.]){1,})/, 'Password must contain at least 1 special character.');

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});
