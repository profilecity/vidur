import { eq } from 'drizzle-orm';
import { removeMemberSchema } from '~~/shared/schemas/setting';
import authenticateAdminRequest from '~~/server/utils/admin';
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const request = await readValidatedBody(event, removeMemberSchema.parse);

  const db = await useDatabase();

  await db.update(usersTable).set({ isAdmin: true }).where(eq(usersTable.id, request.id));
});
