import { inArray } from 'drizzle-orm';
import { metaDataTable } from '../db/schema';
import { GeneralSettings } from '~/schemas/setting';
import { settings_memoryStorage } from '../utils/storage';

export default defineTask<boolean>({
  meta: {
    name: 'seed-cache',
    description: 'This task runs when Nitro server boots up. It initialises cache with default metadata',
  },
  async run() {
    console.log('Seeding Cache');
    const db = await useDatabase();

    const settingEntries = await db
      .select()
      .from(metaDataTable)
      .where(inArray(metaDataTable.key, ['seoConfig', 'careerSiteConfig']));

    const settings: GeneralSettings = {
      careerSite: {},
      seo: {},
    } as GeneralSettings; // Ignore validation errors here.

    settingEntries.forEach((s) => {
      if (s.key == 'seoConfig' && s.value) {
        settings.seo = JSON.parse(s.value);
      } else if (s.key == 'careerSiteConfig' && s.value) {
        settings.careerSite = JSON.parse(s.value);
      }
    });

    await Promise.all([
      settings_memoryStorage.setItem('careerSiteConfig', settings.careerSite),
      settings_memoryStorage.setItem('seoConfig', settings.seo),
    ]);

    return { result: true };
  },
});
