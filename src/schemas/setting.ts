import { z } from 'zod';

export const seoConfig = z
  .object({
    title: z.string().max(60).nullable().optional(), // Std. recommended size.
    description: z.string().max(110).nullable().optional(), // Std. recommended size. (To no cutoff in mobile display)
    keywords: z.string().nullable().optional(),
    twitter: z.string().max(15).nullable().optional(), // Official twitter handle size.
  })

export type SEOConfig = z.infer<typeof seoConfig>;

export const organizationConfig = z
  .object({
    name: z.string().max(36).nullable().optional(),
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

export type OrganizationConfig = z.infer<typeof organizationConfig>;

export const generalSettings = z.object({
  organization: organizationConfig,
  seo: seoConfig,
});

export type GeneralSettings = z.infer<typeof generalSettings>;

export const inviteMember = z.object({
  email: z.string().email(),
});

export const removeMember = z.object({
  id: z.string().uuid(),
});
