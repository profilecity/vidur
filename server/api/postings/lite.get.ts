import { desc } from 'drizzle-orm';
import { jobPostingsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const postings = await db
    .select({ id: jobPostingsTable.id, title: jobPostingsTable.title })
    .from(jobPostingsTable)
    .orderBy(desc(jobPostingsTable.createdAt));
  if (IS_DEV) {
    console.log('[/api/postings/lite] found', postings.length, 'postings');
  }

  return postings;
});
