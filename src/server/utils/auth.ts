import { H3Event } from "h3";
import type { User } from "../db/schema";
import { getToken } from "./jwt";
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export type Credentials = {
  token: string;
  tokenType: string;
};

export default async function authenticateRequest(
  event: H3Event,
  options: { useTokenFromHeader?: boolean } = { useTokenFromHeader: false }
): Promise<{user: User, accessToken: string}> {
  const config = useRuntimeConfig();

  if (!config.services.profileCity) {
    throw new Error("profileCity service URL is required to authenticate");
  }

  const accessToken = await getToken(event, options);

  let user: User | null = null;

  let verifiedDetails;
  try {
    verifiedDetails = await decodeAndValidate(accessToken);
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      message: "Error decoding JWT, most likely expired",
    });
  }
  if (!verifiedDetails) {
    throw createError({
      statusCode: 401,
      message: "Invalid Details from Token",
    });
  }
  try {
    user = await getOrCreateUser(verifiedDetails, accessToken);
  } catch (e: any) {
    console.error("Error while fetching session", e);
    throw createError({
      statusCode: 401,
      message: "Error fetching token",
    });
  }

  if (!user) {
    throw createError({
      statusCode: 400,
      message: "Bad Request: Invalid User",
    });
  }
  return {
    user,
    accessToken,
  };
}
