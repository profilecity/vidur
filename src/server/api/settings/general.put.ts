import { eq } from "drizzle-orm";
import { generalSettings } from "~/schemas/setting";
import { metaDataTable } from "~/server/db/schema";
import authenticateAdminRequest from "~/server/utils/admin"

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  if (IS_DEV) {
    console.log("updating settings")
  }

  const settingsUpdateRequest = await readValidatedBody(event, generalSettings.parse);

  const db = await useDatabase();

  await db.transaction(async (tx) => {
    if (settingsUpdateRequest.seo) {
      const seoSettingsString = JSON.stringify(settingsUpdateRequest.seo);
      await tx.update(metaDataTable).set({ value: seoSettingsString}).where(eq(metaDataTable.key, 'seoConfig'));
    }
    if (settingsUpdateRequest.organization) {
      const organizationSettingsString = JSON.stringify(settingsUpdateRequest.organization);
      await tx.update(metaDataTable).set({ value: organizationSettingsString}).where(eq(metaDataTable.key, 'organizationConfig'));
    }
  })
})