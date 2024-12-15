import { eq } from 'drizzle-orm';
import { removeMemberSchema } from '~~/shared/schemas/setting';
import { adminsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const request = await readValidatedBody(event, removeMemberSchema.parse);

  const db = await useDatabase();

  await db.delete(adminsTable).where(eq(adminsTable.id, request.id));
});
