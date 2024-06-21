import { eq } from 'drizzle-orm';
import { hooksTable, jobPostingsTable } from '../db/schema';
import authenticateAdminRequest from '../utils/admin';
import { deleteHookSchema } from '~/schemas/hook';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const q = await getValidatedQuery(event, deleteHookSchema.parse);

  const hookId = q.id;

  const database = await useDatabase();

  const hooksDeleteResult = await database
    .delete(hooksTable)
    .where(eq(hooksTable.id, hookId))
    .returning({ id: jobPostingsTable.id });

  if (!(Array.isArray(hooksDeleteResult) && hooksDeleteResult.length == 1)) {
    throw createError({
      statusCode: 400,
      message:
        'Invalid hook id. Contact support if you think this is a mistake.',
    });
  }
});
