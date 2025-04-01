import { type JobPosting } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const query = getQuery<{ id: string }>(event);

  if (IS_DEV) {
    console.log('[PUBLIC] fetching posting with id', query.id);
  }

  if (!query.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Id required',
    });
  }

  const postings = ((await general_memoryStorage.getItem<JobPosting[]>('postings')) || [])
    .filter((p) => p.id === query.id && p.isPublished && !p.isExpired)
    .map((p) => {
      return {
        ...p,
        owner: null,
      };
    });

  if (postings.length != 1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Posting not found',
    });
  }

  if (IS_DEV) {
    logger.info('[PUBLIC] postings page found', postings.length, 'postings with id', query.id);
  }

  return postings[0];
});
