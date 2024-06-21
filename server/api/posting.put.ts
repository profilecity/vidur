import { jobPostingsTable } from "../db/schema";
import authenticateAdminRequest from "../utils/admin";
import { and, eq } from "drizzle-orm";
import { updateJobPostingSchema } from "~/schemas/posting";

export default defineEventHandler(async (event) => {
  const database = await useDatabase();

  const session = await authenticateAdminRequest(event);
  const q = await readValidatedBody(event, updateJobPostingSchema.parse);

  if (IS_DEV) {
    console.log("updating posting id", q.id);
  }

  const jobPostingId = q.id;

  const jobPostingsResult = await database
    .select()
    .from(jobPostingsTable)
    .where(
      and(
        eq(jobPostingsTable.id, jobPostingId),
        eq(jobPostingsTable.owner, session.user.id)
      )
    );

  if (!(Array.isArray(jobPostingsResult) && jobPostingsResult.length == 1)) {
    throw createError({
      statusCode: 400,
      message:
        "Invalid posting id. Contact support if you think this is a mistake.",
    });
  }

  const oldJobPosting = jobPostingsResult[0];

  if (oldJobPosting.owner != session.user.id) {
    throw createError({
      statusCode: 400,
      message: "Provided owner is not authorised to update this job posting",
    });
  }

  if (!oldJobPosting.isPublished && q.isPublished) {
    if (IS_DEV) {
      console.log("posting " + q.id + " published by " + session.user.firstName);
    }
  }

  const updateQuery = {
    ...q,
    updatedAt: new Date(),
  };

  const updatedJobPosting = await database
    .update(jobPostingsTable)
    .set(updateQuery)
    .where(eq(jobPostingsTable.id, q.id))
    .returning();

  return updatedJobPosting;
});
