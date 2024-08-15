import { eq } from 'drizzle-orm';
import { usersTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();
  const members = await db.select().from(usersTable).where(eq(usersTable.isAdmin, true));

  if (IS_DEV) {
    logger.info(members.length, 'members found');
  }

  return members;
});
