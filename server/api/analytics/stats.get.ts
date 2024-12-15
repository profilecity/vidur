import { count, eq, not } from 'drizzle-orm';
import { jobPostingsTable, usersTable } from '~~/server/db/schema';
import authenticateAdminRequest from '~~/server/utils/admin';

export type Stats = {
  totalActivePostings: number;
  totalActiveApplicants: number;
  totalApplicants: number;
};

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const activePostings = await db
    .select({ totalApplicants: jobPostingsTable.totalApplicants })
    .from(jobPostingsTable)
    .where(eq(jobPostingsTable.isPublished, true));
  const totalActivePostings = activePostings.length;

  let totalActiveApplicants = 0;
  activePostings.forEach((p) => {
    totalActiveApplicants += p.totalApplicants;
  });

  const totalApplicants = (await db.select({ count: count() }).from(usersTable))[0]?.count || 0;

  const stats = {
    totalActivePostings,
    totalActiveApplicants,
    totalApplicants,
  } satisfies Stats;

  if (IS_DEV) {
    console.log(stats);
  }

  return stats;
});
