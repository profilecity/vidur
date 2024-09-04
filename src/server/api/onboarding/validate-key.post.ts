import { eq } from 'drizzle-orm';
import { usersTable } from '~/server/db/schema';
import authenticateRequest from '~/server/utils/auth';

export default defineEventHandler(async (event) => {
  const session = await authenticateRequest(event);
  const body = await readBody(event);
  if (!body.key) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing key from body',
    });
  }
  const inputKey = body.key as string;
  const actualKey = await general_memoryStorage.getItem('firstSetupAccessKey');

  if (inputKey === actualKey) {
    const db = await useDatabase();
    await db
      .update(usersTable)
      .set({ isAdmin: true })
      .where(eq(usersTable.id, session.user.id));
    return {
      result: true,
    };
  }

  return { result: false };
});
