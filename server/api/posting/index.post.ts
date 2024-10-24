import authenticateAdminRequest from '../../utils/admin';
import { createJobPostingSchema } from '~~/shared/schemas/posting';
import { type JobPosting, jobPostingsTable } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const session = await authenticateAdminRequest(event);
  const jobPostingRequest = await readValidatedBody(event, createJobPostingSchema.parse);

  const jobPostingDTO: typeof jobPostingsTable.$inferInsert = {
    ...jobPostingRequest,
    validTill: jobPostingRequest.validTill ? new Date(jobPostingRequest.validTill) : undefined,
  };

  if (IS_DEV) {
    console.log('creating posting', jobPostingRequest);
  }

  const database = await useDatabase();

  const newPosting = (
    await database
      .insert(jobPostingsTable)
      .values({ ...jobPostingDTO, owner: session.user.id })
      .returning()
  )[0] as JobPosting;

  const postings = (await general_memoryStorage.getItem<JobPosting[]>('postings')) || [];

  postings.unshift(newPosting);
  await general_memoryStorage.setItem('postings', postings);
});
