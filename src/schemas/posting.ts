import { z } from "zod";

export const listJobPostingsFilterSchema = z
  .object({
    id: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
  })
  .optional();

export const createJobPostingSchema = z.object({
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
});

export const updateJobPostingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
});

export const deleteJobPostingSchema = z.object({
  id: z.string().uuid(),
});