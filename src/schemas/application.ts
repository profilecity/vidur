import { z } from 'zod';

export const applicationCreateSchema = z.object({
  postingId: z.string().uuid(),
});

export const applicationsLookupSchema = z.object({
  postingIds: z.array(z.string().uuid()),
})