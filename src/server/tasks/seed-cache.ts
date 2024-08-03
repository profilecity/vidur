import { inArray } from 'drizzle-orm';
import { metaDataTable } from '../db/schema';
import { GeneralSettings } from '~/schemas/setting';
import { prefixStorage } from 'unstorage';
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
      .where(inArray(metaDataTable.key, ['seoConfig', 'organizationConfig']));

    const settings: GeneralSettings = {
      organization: {},
      seo: {},
    } as GeneralSettings; // Ignore validation errors here.

    settingEntries.forEach((s) => {
      if (s.key == 'seoConfig' && s.value) {
        settings.seo = JSON.parse(s.value);
      } else if (s.key == 'organizationConfig' && s.value) {
        settings.organization = JSON.parse(s.value);
      }
    });

    await Promise.all([
      settings_memoryStorage.setItem('organizationConfig', settings.organization),
      settings_memoryStorage.setItem('seoConfig', settings.seo),
    ]);

    return { result: true };
  },
});
