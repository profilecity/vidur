import { z } from 'zod';

export const createHookSchema = z.object({
  url: z.string().url().max(255).min(1),
  title: z.string().max(40).min(1),
});

export const updateHookSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().max(255).min(1),
  title: z.string().max(40).min(1),
});

export const deleteHookSchema = z.object({
  id: z.string().uuid(),
});
