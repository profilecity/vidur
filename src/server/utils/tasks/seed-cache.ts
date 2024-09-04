import { inArray } from 'drizzle-orm';
import { GeneralSettings } from '~/schemas/setting';
import { metaDataTable } from '~/server/db/schema';

export async function seedCache() {
  console.log('Seeding Cache');
  const { remoteAssetBase } = useRuntimeConfig();

  const db = await useDatabase();
  const metadataEntries = await db
    .select()
    .from(metaDataTable)
    .where(
      inArray(metaDataTable.key, [
        'seoConfig',
        'careerSiteConfig',
        'firstSetupAccessKey',
      ])
    );

  const settings: GeneralSettings = {
    careerSite: {},
    seo: {},
  } as GeneralSettings; // Ignore validation errors here.

  let firstSetupAccessKey: string | null = null;

  metadataEntries.forEach((s) => {
    if (s.key == 'seoConfig' && s.value) {
      settings.seo = JSON.parse(s.value);
    } else if (s.key == 'careerSiteConfig' && s.value) {
      settings.careerSite = JSON.parse(s.value);
    } else if (s.key == 'firstSetupAccessKey') {
      firstSetupAccessKey = s.value;
    }
  });

  await Promise.all([
    settings_memoryStorage.setItem('careerSiteConfig', settings.careerSite),
    settings_memoryStorage.setItem('seoConfig', settings.seo),
    general_memoryStorage.setItem('firstSetupAccessKey', firstSetupAccessKey),
    general_memoryStorage.setItem('remoteAssetBase', remoteAssetBase),
  ]);

  return { result: true };
}
