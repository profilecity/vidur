import { createHookSchema } from '~~/shared/schemas/hook';
import authenticateAdminRequest from '../utils/admin';
import { hooksTable } from '../db/schema';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const body = await readValidatedBody(event, createHookSchema.parse);

  const createdHookResult = await db
    .insert(hooksTable)
    .values(body)
    .returning();

  if (IS_DEV) {
    console.log('hook created', createdHookResult[0]);
  }

  return createdHookResult[0];
});
