import { jobPostingsTable } from '../../db/schema';
import authenticateAdminRequest from '../../utils/admin';
import { eq } from 'drizzle-orm';
import { updateJobPostingSchema } from '~/schemas/posting';
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {
  const database = await useDatabase();

  await authenticateAdminRequest(event);
  const q = await readValidatedBody(event, updateJobPostingSchema.parse);

  if (IS_DEV) {
    logger.info('updating posting id', q.id);
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
