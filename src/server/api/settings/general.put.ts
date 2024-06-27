import { eq } from 'drizzle-orm';
import { generalSettingsSchema } from '~/schemas/setting';
import { metaDataTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  if (IS_DEV) {
    console.log('updating settings');
  }

  const settingsUpdateRequest = await readValidatedBody(event, generalSettingsSchema.parse);

  const db = await useDatabase();

  await db.transaction(async (tx) => {
    if (settingsUpdateRequest.seo) {
      const seoSettingsString = JSON.stringify(settingsUpdateRequest.seo);
      await tx
        .update(metaDataTable)
        .set({ value: seoSettingsString, updatedAt: new Date() })
        .where(eq(metaDataTable.key, 'seoConfig'));
    }
    if (settingsUpdateRequest.organization) {
      const organizationSettingsString = JSON.stringify(settingsUpdateRequest.organization);
      await tx
        .update(metaDataTable)
        .set({ value: organizationSettingsString, updatedAt: new Date() })
        .where(eq(metaDataTable.key, 'organizationConfig'));
    }
  });
});
