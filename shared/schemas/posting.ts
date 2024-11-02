import { z } from 'zod';

const employmentTypeEnum = z.enum([
  'FULL_TIME',
  'PART_TIME',
  'CONTRACTOR',
  'TEMPORARY',
  'INTERN',
  'VOLUNTEER',
  'PER_DIEM',
  'OTHER',
]);

const jobLocationSchema = z.object({
  streetAddress: z.string().optional(),
  addressLocality: z.string().optional(),
  addressRegion: z.string().optional(),
  postalCode: z.string().optional(),
  addressCountry: z.string(),
});

const baseSalarySchema = z.object({
  unitText: z.enum(['Hour', 'Day', 'Week', 'Month', 'Year']),
  currency: z.string().length(3),
  minValue: z.number(),
  maxValue: z.number(),
});

export const listJobPostingsFilterSchema = z
  .object({
    id: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
    employmentType: z.array(employmentTypeEnum).optional(),
    jobLocation: z.array(jobLocationSchema).optional(),
    isRemote: z.boolean().optional(),
    baseSalary: baseSalarySchema.optional(),
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
  employmentType: z.array(employmentTypeEnum).optional(),
  jobLocation: z.array(jobLocationSchema).optional(),
  isRemote: z.boolean().optional(),
  baseSalary: baseSalarySchema.optional(),
});

export const updateJobPostingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
  validTill: z.string().optional(), // Ideally it is a date field, but gets converted to string due to stringification.
  employmentType: z.array(employmentTypeEnum).optional(),
  jobLocation: z.array(jobLocationSchema).optional(),
  isRemote: z.boolean().optional(),
  baseSalary: baseSalarySchema.optional(),
});

export const deleteJobPostingSchema = z.object({
  id: z.string().uuid(),
});
