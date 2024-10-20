import { and, eq, lte } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { jobPostingsTable } from '~~/server/db/schema';

export async function expireJobPostings(db: NodePgDatabase) {
  const today = new Date();
  const affectedIds = await db
    .update(jobPostingsTable)
    .set({ isExpired: true })
    .where(and(lte(jobPostingsTable.validTill, today), eq(jobPostingsTable.isExpired, false)))
    .returning({ id: jobPostingsTable.id });

  console.log(`[${today}]: Marked ${affectedIds.length} postings as expired.`);
}
