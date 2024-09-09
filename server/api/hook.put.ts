import { updateHookSchema } from '~~/shared/schemas/hook';
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

  await db.update(hooksTable).set(updateQuery).where(eq(hooksTable.id, body.id));
});
