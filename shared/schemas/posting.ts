import { z } from 'zod';

export const listJobPostingsFilterSchema = z
  .object({
    id: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
  })
  .optional();

export const fetchJobPostingFilterSchema = z.object({
  id: z.string().uuid(),
});

export const createJobPostingSchema = z.object({
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
  validTill: z.string().optional(), // Ideally it is a date field, but gets converted to string due to stringification.
});

export const updateJobPostingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
  validTill: z.string().optional(), // Ideally it is a date field, but gets converted to string due to stringification.
});

export const deleteJobPostingSchema = z.object({
  id: z.string().uuid(),
});
