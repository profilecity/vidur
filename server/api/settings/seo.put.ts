import { eq } from 'drizzle-orm';
import { seoConfigSchema } from '~~/shared/schemas/setting';
import { metaDataTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';
import { settings_memoryStorage } from '~~/server/utils/storage';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  if (IS_DEV) {
    console.log('updating seoConfig');
  }

  const settingsUpdateRequest = await readValidatedBody(event, seoConfigSchema.parse);

  const db = await useDatabase();

  const seoConfigString = JSON.stringify(settingsUpdateRequest);
  await db
    .update(metaDataTable)
    .set({ value: seoConfigString, updatedAt: new Date() })
    .where(eq(metaDataTable.key, 'seoConfig'));
  await settings_memoryStorage.setItem('seoConfig', settingsUpdateRequest);
});
