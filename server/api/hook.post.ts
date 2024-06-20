import { createHookSchema } from "~/schemas/hook";
import authenticateAdminRequest from "../utils/admin"
import { hooksTable } from "../db/schema";

export default defineEventHandler(async (event) => {
  await authenticateAdminRequest(event);

  const db = await useDatabase();

  const body = await readValidatedBody(event, createHookSchema.parse);

  const createdHook = await db.insert(hooksTable).values(body).returning();

  if (IS_DEV) {
    console.log("hook created", createdHook);
  }
  
  return createdHook;
})