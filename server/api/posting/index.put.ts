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

  const updateQuery = {
    ...q,
    updatedAt: new Date(),
  };

  const updatedJobPosting = (
    await database
      .update(jobPostingsTable)
      .set(updateQuery)
      .where(eq(jobPostingsTable.id, q.id))
      .returning()
  )[0] as JobPosting;

  const postings =
    (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];

  await general_memoryStorage.setItem(
    'postings',
    postings.map((p) => {
      if (p.id == updatedJobPosting.id) return updatedJobPosting;
      return p;
    })
  );
});
