import { updateHookSchema } from '~/schemas/hook';
import authenticateAdminRequest from '../utils/admin';
import { hooksTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const body = await readValidatedBody(event, updateHookSchema.parse);

  const updateQuery = {
    ...body,
    updatedAt: new Date(),
  };

  const updateResult = await db
    .update(hooksTable)
    .set(updateQuery)
    .where(eq(hooksTable.id, body.id))
    .returning();

  return updateResult[0];
});
