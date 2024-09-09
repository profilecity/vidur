import { eq } from 'drizzle-orm';
import { careerSiteConfigSchema } from '~~/shared/schemas/setting';
import { metaDataTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';
import { settings_memoryStorage } from '~~/server/utils/storage';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  if (IS_DEV) {
    console.log('updating careerSiteConfig');
  }

  const settingsUpdateRequest = await readValidatedBody(event, careerSiteConfigSchema.parse);

  const db = await useDatabase();

  const careerSiteString = JSON.stringify(settingsUpdateRequest);
  await db
    .update(metaDataTable)
    .set({ value: careerSiteString, updatedAt: new Date() })
    .where(eq(metaDataTable.key, 'careerSiteConfig'));
  await settings_memoryStorage.setItem('careerSiteConfig', settingsUpdateRequest);
});
