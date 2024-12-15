import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { type ReviewTag, reviewTagsTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';
import { deleteReviewTagSchema } from '~~/shared/schemas/review-tags';

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const rawQuery = getQuery(event);
  let query: z.infer<typeof deleteReviewTagSchema>;
  try {
    query = deleteReviewTagSchema.parse({ id: Number(rawQuery.id) });
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Query',
    });
  }

  if (IS_DEV) {
    console.log('Deleting Review Tag', query);
  }

  const db = await useDatabase();
  await db.delete(reviewTagsTable).where(eq(reviewTagsTable.id, query.id));

  const reviewTags = (await general_memoryStorage.getItem<ReviewTag[]>('reviewTags')) || [];
  await general_memoryStorage.setItem(
    'reviewTags',
    reviewTags.filter((rt) => rt.id !== query.id)
  );
});
