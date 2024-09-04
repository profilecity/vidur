import { eq } from 'drizzle-orm';
import { generalSettingsSchema } from '~/schemas/setting';
import { metaDataTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';
import { settings_memoryStorage } from '~/server/utils/storage';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  if (IS_DEV) {
    console.log('updating settings');
  }

  const settingsUpdateRequest = await readValidatedBody(
    event,
    generalSettingsSchema.parse
  );

  const db = await useDatabase();

  await db.transaction(async (tx) => {
    if (settingsUpdateRequest.seo) {
      const seoSettingsString = JSON.stringify(settingsUpdateRequest.seo);
      await tx
        .update(metaDataTable)
        .set({ value: seoSettingsString, updatedAt: new Date() })
        .where(eq(metaDataTable.key, 'seoConfig'));
      settings_memoryStorage.setItem('seoConfig', settingsUpdateRequest.seo);
    }
    if (settingsUpdateRequest.careerSite) {
      const careerSiteString = JSON.stringify(settingsUpdateRequest.careerSite);
      await tx
        .update(metaDataTable)
        .set({ value: careerSiteString, updatedAt: new Date() })
        .where(eq(metaDataTable.key, 'careerSiteConfig'));
      settings_memoryStorage.setItem(
        'careerSiteConfig',
        settingsUpdateRequest.careerSite
      );
    }
  });
});
