import { eq } from 'drizzle-orm';
import { jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { fetchJobPostingFilterSchema } from '~~/shared/schemas/posting';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  const q = await getValidatedQuery(event, fetchJobPostingFilterSchema.parse);

  const database = await useDatabase();

  return (
    await database
      .select()
      .from(jobPostingsTable)
      .where(eq(jobPostingsTable.id, q.id))
      .orderBy(jobPostingsTable.createdAt)
      .limit(1)
  )[0];
});
