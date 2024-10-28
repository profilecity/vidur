import { z } from 'zod';

export const updateReviewTagSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(32),
  parent: z.number().int().min(0).max(4),
});

export const createReviewTagSchema = z.object({
  title: z.string().max(32),
  parent: z.number().int().min(0).max(4),
});

export const deleteReviewTagSchema = z.object({
  id: z.number().int().positive(),
});
