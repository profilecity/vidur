import type { z } from 'zod';
import type { ReviewTag } from '~~/server/db/schema';
import type {
  createReviewTagSchema,
  deleteReviewTagSchema,
  updateReviewTagSchema,
} from '~~/shared/schemas/review-tags';

type UpdateReviewTag = z.infer<typeof updateReviewTagSchema>;
type CreateReviewTag = z.infer<typeof createReviewTagSchema>;
type DeleteReviewTag = z.infer<typeof deleteReviewTagSchema>;
export function useReviewTagsRepository() {
  return useObjectRepository<ReviewTag[], never, UpdateReviewTag, never, CreateReviewTag, never, DeleteReviewTag>({
    key: 'review-tags',
    fetchURL: '/api/review-tags',
    postURL: '/api/review-tag',
    updateURL: '/api/review-tag',
    deleteURL: '/api/review-tag',
    initFn: () => [],
  });
}

// export function useReviewTagService() {
//   const changing = ref(false);
//   const updateReviewTag = async (options: ) => {
//     try {
//       changing.value = true;
//       await
//     } catch (error) {}
//   };
// }
