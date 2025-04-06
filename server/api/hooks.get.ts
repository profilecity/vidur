import { desc } from 'drizzle-orm';
import { hooksTable } from '../db/schema';
import authenticateAdminRequest from '../utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const hooks = await db.select().from(hooksTable).orderBy(desc(hooksTable.createdAt));

  if (IS_DEV) {
    logger.info('Found', hooks.length, 'Hooks');
  }

  return hooks;
});
