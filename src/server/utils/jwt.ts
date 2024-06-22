import jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import type { H3Event } from 'h3';

let jwksClient: JwksClient | null = null;

if (IS_DEV) {
  console.log('!!! NOTICE !!!\nBYPASSING TOKEN VALIDATION IN DEV MODE');
}

export async function getToken(
  event: H3Event,
  options: { useTokenFromHeader?: boolean } = { useTokenFromHeader: false },
): Promise<string> {
  let accessToken: string;

  if (options.useTokenFromHeader) {
    const bearerTokenHeader = getHeader(event, 'Authorization');
    if (!bearerTokenHeader) {
      throw createError({
        statusCode: 401,
        message: 'Missing bearer token in header',
      });
    }
    const decomposedHeader = bearerTokenHeader.split(' ');
    if (!(decomposedHeader.length == 2 && decomposedHeader[0] == 'Bearer')) {
      throw createError({
        statusCode: 401,
        message: 'Invalid bearer token in header',
      });
    }

    accessToken = decomposedHeader[1];
  } else {
    const cookie = getCookie(event, 'oauth_access_token');
    if (cookie) {
      const credentials = JSON.parse(cookie) as Credentials;
      if (!credentials.token) {
        throw createError({
          statusCode: 401,
          message: 'Invalid Cookie',
        });
      }

      accessToken = credentials.token;
    } else {
      throw createError({
        statusCode: 401,
        message: 'Missing Cookie',
      });
    }
  }

  return accessToken;
}

export async function decodeAndValidate(jwToken: string): Promise<any> {
  const config = useRuntimeConfig();

  if (!jwksClient) {
    jwksClient = new JwksClient({
      jwksUri: config.jwksEndpoint,
    });
  }
  if (IS_DEV) {
    return jwt.decode(jwToken);
  }
  return new Promise(async (resolve, reject) => {
    // @ts-ignore
    jwt.verify(
      jwToken,
      async (header, callback) => {
        const kid = header.kid;
        if (!kid) {
          callback(
            new Error(
              'No kid found for provided header ' + JSON.stringify(header),
            ),
            undefined,
          );
          return;
        }
        const key = await jwksClient?.getSigningKey(kid);

        callback(null, key?.getPublicKey());
      },
      (error, payload) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(payload);
      },
    );
  });
}
