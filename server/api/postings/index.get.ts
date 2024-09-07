import { type JobPosting, jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { desc } from 'drizzle-orm';

/**
 * DB lookup for totalApplicants and cache lookup for everything else.
 */
export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const database = await useDatabase();

  const totalApplicantsRecord = await database
    .select({
      id: jobPostingsTable.id,
      totalApplicants: jobPostingsTable.totalApplicants,
    })
    .from(jobPostingsTable)
    .orderBy(desc(jobPostingsTable.createdAt));

  const totalApplicantsById: Record<string, number> = {};
  totalApplicantsRecord.forEach(
    (tar) => (totalApplicantsById[tar.id] = tar.totalApplicants)
  );

  const postings =
    (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];
  return postings.map((p) => ({
    ...p,
    contents: null,
    totalApplicants: totalApplicantsById[p.id] || 0,
  }));
});
