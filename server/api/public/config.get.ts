import { general_memoryStorage } from '~~/server/utils/storage';
import type { CareerSiteConfig, SEOConfig } from '~~/shared/schemas/setting';

export default defineEventHandler(async () => {
  const remoteAssetBase = (await general_memoryStorage.getItem('remoteAssetBase')) as string;
  const onboardingStatus = !((await general_memoryStorage.getItem('firstSetupAccessKey')) as string);
  const totalActivePostings = (await general_memoryStorage.getItem('totalActivePostings')) as number;

  const settings = {
    careerSite: {},
    seo: {},
  } as { careerSite: CareerSiteConfig; seo: SEOConfig };

  settings.seo = (await settings_memoryStorage.getItem('seoConfig')) as SEOConfig;
  settings.careerSite = (await settings_memoryStorage.getItem('careerSiteConfig')) as CareerSiteConfig;

  return { remoteAssetBase, onboardingStatus, totalActivePostings, settings };
});
