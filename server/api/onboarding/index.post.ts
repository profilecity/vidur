import { eq } from 'drizzle-orm';
import { metaDataTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

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
    await db.transaction(async (tx) => {
      logger.warn('deleting firstSetupAccessKey');
      await tx.delete(metaDataTable).where(eq(metaDataTable.key, 'firstSetupAccessKey'));
      general_memoryStorage.removeItem('firstSetupAccessKey');
    });

    return;
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Invalid key',
  });
});
