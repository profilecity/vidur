import { type SEOConfig } from '~~/shared/schemas/setting';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  return (await settings_memoryStorage.getItem('seoConfig')) as SEOConfig;
});
