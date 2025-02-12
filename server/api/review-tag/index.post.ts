import { type ReviewTag, reviewTagsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';
import { createReviewTagSchema } from '~~/shared/schemas/review-tags';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const reviewTagInput = await readValidatedBody(event, createReviewTagSchema.parse);

  if (IS_DEV) {
    console.log('Creating ReviewTag', reviewTagInput);
  }

  const db = await useDatabase();
  const reviewTag = (
    await db.insert(reviewTagsTable).values({ title: reviewTagInput.title, parent: reviewTagInput.parent }).returning()
  )[0]!;

  const reviewTags = (await general_memoryStorage.getItem<ReviewTag[]>('reviewTags')) || [];

  reviewTags.push(reviewTag);
  await general_memoryStorage.setItem('reviewTags', reviewTags);
});
