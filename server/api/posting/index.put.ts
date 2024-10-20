import { type JobPosting, jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { eq } from 'drizzle-orm';
import { updateJobPostingSchema } from '~~/shared/schemas/posting';

export default defineEventHandler(async (event) => {
  const database = await useDatabase();

  await authenticateAdminRequest(event);
  const q = await readValidatedBody(event, updateJobPostingSchema.parse);

  if (IS_DEV) {
    console.log('updating posting id', q.id);
  }

  const isPostingAlreadyExpired = (
    await database
      .select({ isExpired: jobPostingsTable.isExpired })
      .from(jobPostingsTable)
      .where(eq(jobPostingsTable.id, q.id))
  )[0]?.isExpired;

  if (isPostingAlreadyExpired) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Expired postings cannot be updated.',
    });
  }

  const updateQuery = {
    ...q,
    updatedAt: new Date(),
  };

  const updatedJobPosting = (
    await database.update(jobPostingsTable).set(updateQuery).where(eq(jobPostingsTable.id, q.id)).returning()
  )[0] as JobPosting;

  const postings = (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];
  const updatedPostings = postings.map((p) => {
    if (p.id == updatedJobPosting.id) return updatedJobPosting;
    return p;
  });

  await general_memoryStorage.setItem('postings', updatedPostings);

  await general_memoryStorage.setItem(
    'totalActivePostings',
    updatedPostings.filter((p) => !p.isExpired && p.isPublished).length
  );
});
