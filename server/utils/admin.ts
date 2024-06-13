import { H3Event } from "h3";
import authenticateRequest from "./auth";

export default async function authenticateAdminRequest(
  event: H3Event,
) {
  const user = await authenticateRequest(event);

  if (!user.isAdmin) {
    throw createError({
      statusCode: 401,
      message: "User is not an admin",
    })
  }

  return user;
}

export function hasPermissions(acquiredPermissions: number, requiredPermissions: number) {
  if ((acquiredPermissions & 1) === 1) {
    // Bypass permission check for super-admin (has virtually all the permissions)
    return true;
  }
  return (acquiredPermissions & requiredPermissions) === requiredPermissions;
}