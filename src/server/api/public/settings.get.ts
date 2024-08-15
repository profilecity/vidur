import { z } from 'zod';
import { GeneralSettings } from '~/schemas/setting';
import { settings_memoryStorage } from '~/server/utils/storage';
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
const settingsLookupSchema = z.object({
  config: z.enum(['seoConfig', 'organizationConfig']).optional(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, settingsLookupSchema.parse);
  const queries = query.config ? [query.config] : ['seoConfig', 'organizationConfig'];

  if (IS_DEV) {
    logger.info("fetching public settings. queries:", queries);
  }

  const settings: GeneralSettings = {
    organization: {},
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
      case 'organizationConfig':
        value = await settings_memoryStorage.getItem(query);
        settings.organization = value as GeneralSettings['organization'];
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
