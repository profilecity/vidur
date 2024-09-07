import { eq } from 'drizzle-orm';
import { type JobPosting, jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { deleteJobPostingSchema } from '~~/shared/schemas/posting';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  const q = await getValidatedQuery(event, deleteJobPostingSchema.parse);

  const jobPostingId = q.id;

  const database = await useDatabase();

  const jobPostingsResult = await database
    .delete(jobPostingsTable)
    .where(eq(jobPostingsTable.id, jobPostingId))
    .returning({ id: jobPostingsTable.id });

  if (jobPostingsResult.length == 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Job posting not found',
    });
  }

  const deletedPostingId = jobPostingsResult[0]?.id;

  const postings =
    (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];

  await general_memoryStorage.setItem(
    'postings',
    postings.filter((p) => p.id !== deletedPostingId)
  );
});
