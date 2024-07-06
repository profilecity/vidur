import { inArray } from "drizzle-orm";
import { GeneralSettings } from "~/schemas/setting";
import { metaDataTable } from "~/server/db/schema";
import authenticateAdminRequest from "~/server/utils/admin"

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const settingEntries = await db.select().from(metaDataTable).where(inArray(metaDataTable.key, ['seoConfig', 'organizationConfig']));

  const settings: GeneralSettings = {
    organization: {},
    seo: {},
  } as GeneralSettings; // Ignore validation errors here.

  settingEntries.forEach(s => {
    if (s.key == 'seoConfig' && s.value) {
      settings.seo = JSON.parse(s.value);
    } else if (s.key == 'organizationConfig' && s.value) {
      settings.organization = JSON.parse(s.value);
    }
  });

  return settings;
})