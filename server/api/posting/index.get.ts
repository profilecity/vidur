import { type JobPosting } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { fetchJobPostingFilterSchema } from '~~/shared/schemas/posting';

/**
 * In future, if totalApplicants needed on posting page from admin side,
 * either revamp caching or use database straight away for applicants.
 */
export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  const q = await getValidatedQuery(event, fetchJobPostingFilterSchema.parse);

  const postings =
    (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];

  const posting = postings.find((p) => p.id === q.id);

  if (!posting) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Posting not found',
    });
  }

  return posting;
});
