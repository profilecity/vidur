import { and, eq } from "drizzle-orm";
import { jobPostingsTable } from "../db/schema";
import authenticateAdminRequest from "../utils/admin";
import { deleteJobPostingSchema } from "~/schemas/posting"

export default defineEventHandler(async (event) => {
  const session = await authenticateAdminRequest(event);

  const q = await getValidatedQuery(event, deleteJobPostingSchema.parse);

  const jobPostingId = q.id;

  const database = await useDatabase();

  const jobPostingsResult = await database
    .delete(jobPostingsTable)
    .where(
      and(
        eq(jobPostingsTable.id, jobPostingId),
        eq(jobPostingsTable.owner, session.user.id)
      )
    )
    .returning({ id: jobPostingsTable.id });

  if (!(Array.isArray(jobPostingsResult) && jobPostingsResult.length == 1)) {
    throw createError({
      statusCode: 400,
      message:
        "Invalid posting id. Contact support if you think this is a mistake.",
    });
  }
});
