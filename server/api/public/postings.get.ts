import { type JobPosting } from '~~/server/db/schema';

export default defineEventHandler(async (_) => {
  const postings = ((await general_memoryStorage.getItem<JobPosting[]>('postings')) || [])
    .filter((p) => p.isPublished && !p.isExpired)
    .map((p) => ({
      ...p,
      contents: null,
      owner: null,
    }));

  if (IS_DEV) {
    console.log('[PUBLIC] postings page found', postings.length, 'postings.');
  }

  return postings;
});
