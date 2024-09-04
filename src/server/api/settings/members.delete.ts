import { eq } from 'drizzle-orm';
import { removeMemberSchema } from '~/schemas/setting';
import { usersTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const request = await readValidatedBody(event, removeMemberSchema.parse);

  const db = await useDatabase();

  await db
    .update(usersTable)
    .set({ isAdmin: false })
    .where(eq(usersTable.id, request.id));
});
