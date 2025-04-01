import { type JobPosting } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const postings = (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];

  if (IS_DEV) {
    logger.info('[/api/postings/lite] found', postings.length, 'postings');
  }

  return postings.map((p) => ({ id: p.id, title: p.title }));
});
