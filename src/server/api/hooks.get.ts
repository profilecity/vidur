import { hooksTable } from "../db/schema";
import authenticateAdminRequest from "../utils/admin"
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  
  const db = await useDatabase();

  const hooks = await db.select().from(hooksTable);

  if (IS_DEV) {
    logger.info("Found", hooks.length, "Hooks");
  }

  return hooks;
})