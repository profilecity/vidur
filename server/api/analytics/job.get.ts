import { eq } from 'drizzle-orm';
import { jobPostingsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  return db
    .select()
    .from(jobPostingsTable)
    .where(eq(jobPostingsTable.isPublished, true))
    .limit(3);
});
