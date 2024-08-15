import { jobPostingsTable } from '~/server/db/schema';
import authenticateAdminRequest from '~/server/utils/admin';
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const postings = await db.select({ id: jobPostingsTable.id, title: jobPostingsTable.title }).from(jobPostingsTable);

  if (IS_DEV) {
    logger.info('[/api/postings] found', postings.length, 'postings');
  }

  return postings;
});
