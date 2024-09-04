import { jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { and, eq, or } from 'drizzle-orm';
import { listJobPostingsFilterSchema } from '~/schemas/posting';

export default defineEventHandler(async (event) => {
  const database = await useDatabase();

  const session = await authenticateAdminRequest(event);
  const q = await getValidatedQuery(event, listJobPostingsFilterSchema.parse);

  const conditions = [];

  if (q && q.id) {
    conditions.push(eq(jobPostingsTable.id, q.id));
  } else if (q && q.ownerId) {
    // If owner specified, just return published postings.
    conditions.push(
      and(
        eq(jobPostingsTable.owner, q.ownerId),
        eq(jobPostingsTable.isPublished, true)
      )
    );
  } else {
    // If owner not specified, just return published postings + postings by admin himself
    conditions.push(
      or(
        eq(jobPostingsTable.isPublished, true),
        eq(jobPostingsTable.owner, session.user.id)
      )
    );
  }

  return database
    .select()
    .from(jobPostingsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(jobPostingsTable.createdAt);
});
