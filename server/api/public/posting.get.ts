import { and, eq } from "drizzle-orm";
import { jobPostingsTable } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const database = await useDatabase();

  const query = getQuery<{ id: string }>(event);

  if (IS_DEV) {
    console.log("[PUBLIC] fetching posting with id", query.id);
  }

  if (!query.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id required",
    })
  }

  const postings = await database
    .select()
    .from(jobPostingsTable)
    .where(and(eq(jobPostingsTable.isPublished, true), eq(jobPostingsTable.id, query.id)));

  if (!(Array.isArray(postings) && postings.length == 1)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Posting not found",
    })
  }

  if (IS_DEV) {
    console.log("[PUBLIC] postings page found", postings.length, "postings with id", query.id);
  }

  return postings[0];
});
