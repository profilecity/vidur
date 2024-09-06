import type { z } from 'zod';
import type { JobPosting } from '~~/server/db/schema';
import type {
  createJobPostingSchema,
  deleteJobPostingSchema,
  fetchJobPostingFilterSchema,
  updateJobPostingSchema,
} from '~~/shared/schemas/posting';

export type PostingLite = { id: string; title: string };
export type PostingsLite = PostingLite[];
export function usePostingsLiteRepository(
  options: { immediate?: boolean } = { immediate: true }
) {
  return useObjectRepository<
    PostingsLite,
    never,
    never,
    never,
    never,
    never,
    never
  >({
    key: 'postings-lite',
    fetchURL: '/api/postings/lite',
    initFn: () => [],
    immediate: options.immediate,
  });
}

export type Postings = JobPosting[];
export function usePostingsRepository() {
  return useObjectRepository<
    Postings,
    never,
    never,
    never,
    never,
    never,
    never
  >({
    key: 'postings',
    fetchURL: '/api/postings',
    initFn: () => [],
  });
}

export type CreatePostingSchema = z.infer<typeof createJobPostingSchema>;
export type UpdatePostingSchema = z.infer<typeof updateJobPostingSchema>;
export type FetchPostingSchema = z.infer<typeof fetchJobPostingFilterSchema>;
export type DeletePostingSchema = z.infer<typeof deleteJobPostingSchema>;
export function usePostingRepository(query: FetchPostingSchema) {
  return useObjectRepository<
    JobPosting,
    FetchPostingSchema,
    UpdatePostingSchema,
    never,
    CreatePostingSchema,
    never,
    DeletePostingSchema
  >({
    key: `${query.id}-posting`,
    fetchURL: '/api/posting',
    fetchQuery: query,
    postURL: '/api/posting',
    updateURL: '/api/posting',
    deleteURL: '/api/posting',
  });
}
