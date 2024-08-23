import { z } from 'zod';

export const seoConfigSchema = z.object({
  favicon: z.string().uuid().nullable().optional(),
  title: z.string().max(60).nullable().optional(), // Std. recommended size.
  description: z.string().max(110).nullable().optional(), // Std. recommended size. (To not cutoff in mobile display)
  twitter: z.string().max(15).nullable().optional(), // Official twitter handle size.
});

export type SEOConfig = z.infer<typeof seoConfigSchema>;

export const careerSiteConfigSchema = z.object({
  name: z.string().max(36).min(1),
  bio: z.string().max(120).min(0).optional(), // Standard one-liner to show as tagline.
  description: z.string().nullable().optional(), // Proper markdown enabled bio page.
  location: z.string().max(24).nullable().optional(),
  logo: z.string().uuid(),
  overview: z.object({
    socials: z.array(
      z.object({
        handle: z.string().max(24),
        href: z.string().url(),
      }),
    ),
    companySize: z.number().max(5).min(0).optional(), // [1-10, 10-50, 50-200, 200-1k, 1k-5k, 5k+]
    totalRaised: z.string().max(20).optional(),
    markets: z.string().max(120).min(0).optional(),
  }),
  links: z.array(
    z.object({
      title: z.string().max(24),
      href: z.string().url(),
    }),
  ),
});

export type careerSiteConfig = z.infer<typeof careerSiteConfigSchema>;

export const generalSettingsSchema = z.object({
  careerSite: careerSiteConfigSchema,
  seo: seoConfigSchema,
});

export type GeneralSettings = z.infer<typeof generalSettingsSchema>;

export const addMemberSchema = z.object({
  id: z.string().uuid(),
});

export const removeMemberSchema = addMemberSchema;
