import { hooksTable } from "../db/schema";
import authenticateAdminRequest from "../utils/admin"

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);
  
  const db = await useDatabase();

  return db.select().from(hooksTable);
})