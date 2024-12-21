import { and, eq, ilike, or } from 'drizzle-orm';
import { adminsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const { q } = getQuery(event) as { q: string };

  if (IS_DEV) {
    console.log('lookup user query', q);
  }

  if (!q) {
    return [];
  }

  const looseQ = `%${q}%`;

  const db = await useDatabase();

  const users = await db
    .select()
    .from(adminsTable)
    .where(
      and(
        or(ilike(adminsTable.firstName, looseQ), ilike(adminsTable.lastName, looseQ), ilike(adminsTable.email, looseQ))
      )
    );

  if (IS_DEV) {
    console.log(users.length, 'users found from lookup');
  }

  return users;
});
