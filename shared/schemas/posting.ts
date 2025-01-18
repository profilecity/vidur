import { z } from 'zod';
import { employmentTypeIds } from '../employment-types';
import { salaryUnits } from '../types/posting-types';

const employmentTypeEnum = z.enum(employmentTypeIds);

const jobLocationSchema = z.object({
  streetAddress: z.string().optional(),
  addressLocality: z.string().optional(),
  addressRegion: z.string().optional(),
  postalCode: z.string().optional(),
  addressCountry: z.string(),
});

const currencies = Intl.supportedValuesOf('currency') as readonly string[];

const baseSalarySchema = z.object({
  unitText: z.enum(salaryUnits),
  currency: z
    .string()
    .refine((c) => currencies.includes(c), 'Invalid currency code. Must be a valid ISO 4217 three-letter code.'),
  minValue: z.number(),
  maxValue: z.number(),
});

export const listJobPostingsFilterSchema = z
  .object({
    id: z.string().uuid().optional(),
    ownerId: z.string().uuid().optional(),
    employmentType: employmentTypeEnum,
    isRemote: z.boolean(),
  })
  .optional();

export const fetchJobPostingFilterSchema = z.object({
  id: z.string().uuid(),
});

const baseJobPostingCreateOrUpdateSchema = {
  title: z.string().min(1).max(150),
  contents: z.string().optional(),
  tagsCSV: z.string().optional(),
  isPublished: z.boolean(),
  validTill: z.string().optional(), // Ideally it is a date field, but gets converted to string due to stringification.
  employmentType: employmentTypeEnum,
  jobLocations: z.array(jobLocationSchema).optional(),
  isRemote: z.boolean(),
  baseSalary: baseSalarySchema.optional(),
};

export const createJobPostingSchema = z.object(baseJobPostingCreateOrUpdateSchema);

export const updateJobPostingSchema = z.object({
  id: z.string().uuid(),
  ...baseJobPostingCreateOrUpdateSchema,
});

export const deleteJobPostingSchema = z.object({
  id: z.string().uuid(),
});
