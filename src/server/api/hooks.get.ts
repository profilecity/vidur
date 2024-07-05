import { hooksTable } from "../db/schema";
import authenticateAdminRequest from "../utils/admin"

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  
  const db = await useDatabase();

  const hooks = await db.select().from(hooksTable);

  if (IS_DEV) {
    console.log("Found", hooks.length, "Hooks");
  }

  return hooks;
})