import { eq } from 'drizzle-orm';
import { removeMemberSchema } from '~~/shared/schemas/setting';
import authenticateAdminRequest from '~~/server/utils/admin';
import { adminsTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const request = await readValidatedBody(event, removeMemberSchema.parse);

  const db = await useDatabase();

  await db.update(adminsTable).set({ isDeleted: true }).where(eq(adminsTable.id, request.id));
});
