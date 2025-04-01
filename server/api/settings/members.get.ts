import { adminsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();
  const members = await db.select().from(adminsTable);

  if (IS_DEV) {
    logger.info(members.length, 'members found');
  }

  return members;
});
