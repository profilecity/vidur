import { type ReviewTag } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const reviewTags = (await general_memoryStorage.getItem<ReviewTag[]>('reviewTags')) || [];

  return reviewTags;
});
