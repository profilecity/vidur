import { z } from 'zod';

export const seoConfigSchema = z
  .object({
    title: z.string().max(60).nullable().optional(), // Std. recommended size.
    description: z.string().max(110).nullable().optional(), // Std. recommended size. (To not cutoff in mobile display)
    keywords: z.string().nullable().optional(),
    twitter: z.string().max(15).nullable().optional(), // Official twitter handle size.
  })

export type SEOConfig = z.infer<typeof seoConfigSchema>;

export const organizationConfigSchema = z
  .object({
    name: z.string().max(36).min(1),
    description: z.string().nullable().optional(),
    location: z.string().max(24).nullable().optional(),
    links: z
      .array(
        z.object({
          title: z.string().max(24),
          href: z.string().url(),
        }),
      )
      .nullable()
      .optional(),
  })

export type OrganizationConfig = z.infer<typeof organizationConfigSchema>;

export const generalSettingsSchema = z.object({
  organization: organizationConfigSchema,
  seo: seoConfigSchema,
});

export type GeneralSettings = z.infer<typeof generalSettingsSchema>;

export const addMemberSchema = z.object({
  id: z.string().uuid(),
});

export const removeMemberSchema = addMemberSchema;
