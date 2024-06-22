import authenticateAdminRequest from "../utils/admin";
import { createJobPostingSchema } from "~/schemas/posting";
import { jobPostingsTable } from "../db/schema";

export default defineEventHandler(async (event) => {

  const session = await authenticateAdminRequest(event);
  const jobPostingRequest = await readValidatedBody(
    event,
    createJobPostingSchema.parse
  );

  if (IS_DEV) {
    console.log("creating posting", jobPostingRequest);
  }

  const database = await useDatabase();

  return (
    await database
      .insert(jobPostingsTable)
      .values({ ...jobPostingRequest, owner: session.user.id })
      .returning()
  )[0];
});
