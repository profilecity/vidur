import { eq } from 'drizzle-orm';
import { usersTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();
  const members = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.isAdmin, true));

  if (IS_DEV) {
    console.log(members.length, 'members found');
  }

  return members;
});
