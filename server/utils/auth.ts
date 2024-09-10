import { H3Event } from 'h3';
import type { User } from '../db/schema';
import { getToken } from './jwt';

export type Credentials = {
  token: string;
  tokenType: string;
};

export default async function authenticateRequest(
  event: H3Event,
  options: { useTokenFromHeader?: boolean } = { useTokenFromHeader: false }
): Promise<{ user: User; accessToken: string }> {
  try {
    const config = useRuntimeConfig();

    if (!config.services.profileCity) {
      throw new Error('profileCity service URL is required to authenticate');
    }

    const accessToken = await getToken(event, options);

    let user: User | null | undefined = null;

    let verifiedDetails;
    try {
      verifiedDetails = await decodeAndValidate(accessToken);
    } catch (error: any) {
      throw createError({
        statusCode: 401,
        message: 'Error decoding JWT, most likely expired',
      });
    }
    if (!verifiedDetails) {
      throw createError({
        statusCode: 401,
        message: 'Invalid Details from Token',
      });
    }
    user = await getOrCreateUser(verifiedDetails, accessToken);

    if (!user) {
      throw createError({
        statusCode: 400,
        message: 'Bad Request: Invalid User',
      });
    }
    return {
      user,
      accessToken,
    };
  } catch (e) {
    // @ts-expect-error
    if (e.statusCode === 401) {
      deleteCookie(event, 'oauth_access_token');
    }
    throw e;
  }
}
