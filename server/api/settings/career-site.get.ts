import { type CareerSiteConfig } from '~~/shared/schemas/setting';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  return (await settings_memoryStorage.getItem(
    'careerSiteConfig'
  )) as CareerSiteConfig;
});
