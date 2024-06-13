import { z } from 'zod';

export const applicationCreateSchema = z.object({
  postingId: z.string().uuid(),
});