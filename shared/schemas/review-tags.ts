import { z } from 'zod';

export const reviewTagSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(32),
  parent: z.number().int().min(0).max(4),
});

export type ReviewTag = z.infer<typeof reviewTagSchema>;
