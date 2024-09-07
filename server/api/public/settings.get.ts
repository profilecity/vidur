import {
  type SEOConfig,
  type CareerSiteConfig,
} from '~~/shared/schemas/setting';
import { settings_memoryStorage } from '~~/server/utils/storage';

export default defineEventHandler(async () => {
  if (IS_DEV) {
    console.log('fetching public settings');
  }

  const settings = {
    careerSite: {},
    seo: {},
  } as { careerSite: CareerSiteConfig; seo: SEOConfig };

  settings.seo = (await settings_memoryStorage.getItem(
    'seoConfig'
  )) as SEOConfig;
  settings.careerSite = (await settings_memoryStorage.getItem(
    'careerSiteConfig'
  )) as CareerSiteConfig;

  return settings;
});
