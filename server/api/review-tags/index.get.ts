import { type ReviewTag } from '../../db/schema';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const reviewTags = (await general_memoryStorage.getItem<ReviewTag[]>('reviewTags')) || [];

  return reviewTags;
});
