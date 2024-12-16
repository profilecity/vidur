import { eq, count } from 'drizzle-orm';
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
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
    const registrationNeeded =
      (await db.select({ count: count() }).from(usersTable).where(eq(usersTable.isAdmin, true)))[0]!.count == 0;
    return {
      result: true,
      registrationNeeded,
    };
  }

  return { result: false, registrationNeeded: false };
});
