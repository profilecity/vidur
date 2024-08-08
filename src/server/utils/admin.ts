import { H3Event } from "h3";
import authenticateRequest from "./auth";

export default async function authenticateAdminRequest(
  event: H3Event,
) {
  const session = await authenticateRequest(event);

  const bypassAdmin = useRuntimeConfig().bypassAdmin;

  if (bypassAdmin) {
    console.log("Bypassing Admin Check.");
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
