import { z } from 'zod';

// TODO: implement this UI side
export const onboardingFormSchema = z.object({
  key: z.string(),
  pref: z.object({
    userLevel: z.enum(['EXP', 'AVG', 'NEW']),
    requirements: z.enum(['ORG', 'IND']),
    joingMailingList: z.boolean().default(false),
  }),
});
