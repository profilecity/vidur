import { H3Event } from "h3";
import authenticateRequest from "./auth";
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger

export default async function authenticateAdminRequest(
  event: H3Event,
) {
  const session = await authenticateRequest(event);

  const bypassAdmin = useRuntimeConfig().bypassAdmin;

  if (bypassAdmin) {
    logger.info("Bypassing Admin Check.");
    return session;
  }

  if (!session.user.isAdmin) {
    throw createError({
      statusCode: 401,
      message: "User is not an admin",
    })
  }

  return session;
}
