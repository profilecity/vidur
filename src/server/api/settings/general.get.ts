import { z } from 'zod';
import { GeneralSettings } from '~/schemas/setting';
import authenticateAdminRequest from '~/server/utils/admin';
import { settings_memoryStorage } from '~/server/utils/storage';

const settingsLookupSchema = z.object({
  config: z.enum(['seoConfig', 'careerSiteConfig']).optional(),
});

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const query = await getValidatedQuery(event, settingsLookupSchema.parse);
  const queries = query.config ? [query.config] : ['seoConfig', 'careerSiteConfig'];

  const settings: GeneralSettings = {
    careerSite: {},
    seo: {},
  } as GeneralSettings; // Ignore validation errors here.

  for (let index = 0; index < queries.length; index++) {
    const query = queries[index];
    let value: any;
    switch (query) {
      case 'seoConfig':
        value = await settings_memoryStorage.getItem(query);
        settings.seo = value as GeneralSettings['seo'];
        break;
      case 'careerSiteConfig':
        value = await settings_memoryStorage.getItem(query);
        settings.careerSite = value as GeneralSettings['careerSite'];
        break;
      default:
        throw createError({
          statusCode: 404,
          statusMessage: `no config with key ${query} found`,
        });
    }
  }

  return settings;
});
