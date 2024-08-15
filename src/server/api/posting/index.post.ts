import authenticateAdminRequest from "../../utils/admin";
import { createJobPostingSchema } from "~/schemas/posting";
import { jobPostingsTable } from "../../db/schema";
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {

  const session = await authenticateAdminRequest(event);
  const jobPostingRequest = await readValidatedBody(
    event,
    createJobPostingSchema.parse
  );

  if (IS_DEV) {
    logger.info("creating posting", jobPostingRequest);
  }

  const database = await useDatabase();

  return (
    await database
      .insert(jobPostingsTable)
      .values({ ...jobPostingRequest, owner: session.user.id })
      .returning()
  )[0];
});
