import { and, eq, ilike, or } from 'drizzle-orm';
import { usersTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const { q } = getQuery(event) as { q: string };

  if (IS_DEV) {
    console.log("lookup user query", q);
  }

  if (!q) {
    return [];
  }

  const looseQ = `%${q}%`;

  const db = await useDatabase();

  const users = await db
    .select()
    .from(usersTable)
    .where(
      and(
        or(ilike(usersTable.firstName, looseQ), ilike(usersTable.lastName, looseQ), ilike(usersTable.email, looseQ)),
        eq(usersTable.isAdmin, false), // Only lookup for non-admins;
      ),
    );

  if (IS_DEV) {
    console.log(users.length, 'users found from lookup');
  }

  return users;
});
