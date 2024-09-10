import { generateRandomString, getChallengeFromVerifier } from '~/utils/oauth-support';
import authenticateRequest from '../utils/auth';
import { sendRedirectToLoginPage, sendRedirectToNextPage } from '../utils/redirect';

interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default defineEventHandler(async (event) => {
  try {
    await authenticateRequest(event);
    return sendRedirectToNextPage(event);
  } catch (error) {
    // @ts-expect-error Throw error if issue other than 401.
    if (!error.statusCode || error.statusCode !== 401) {
      console.error('Error while introspecting token.', error);
      throw createError({
        statusCode: 500,
        message: 'Error extracting token',
      });
    }
  }

  const runtimeConfig = useRuntimeConfig(event);

  const query = getQuery<{
    code: string | undefined;
    state: string | undefined;
  }>(event);

  if (query.code) {
    const code = query.code;

    const stateFromQuery = query.state;
    const stateFromCookie = getCookie(event, 'oauth_state');

    if (!(stateFromQuery || stateFromCookie) || stateFromCookie !== stateFromQuery) {
      // State mismatch.
      if (IS_DEV) {
        console.error('State mismatch.');
      }
      return sendRedirectToLoginPage(event);
    }

    const codeVerifier = getCookie(event, 'oauth_code_verifier');

    if (!codeVerifier) {
      console.error('Missing code verifier.', event);
      return sendRedirectToLoginPage(event);
    }

    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', runtimeConfig.oauth.clientId);
    formData.append('redirect_uri', runtimeConfig.public.origin + '/login');
    formData.append('code_verifier', codeVerifier);
    formData.append('code', code);

    try {
      const response = await $fetch<AccessToken>('/oauth2/token', {
        method: 'POST',
        baseURL: runtimeConfig.services.atlas,
        body: formData,
      });

      if (!(response && response.access_token)) {
        throw new Error('Invalid response data: ' + response);
      }

      setCookie(event, 'oauth_access_token', response.access_token);

      return sendRedirectToNextPage(event);
    } catch (error) {
      console.error('Error fetching access token.', error);
      return sendRedirect(event, '/');
    }
  } else {
    const oauthState = generateRandomString();
    const codeVerifier = generateRandomString();

    setCookie(event, 'oauth_state', oauthState);
    setCookie(event, 'oauth_code_verifier', codeVerifier);

    const codeVerifierChallenge = await getChallengeFromVerifier(codeVerifier);

    const oauthParams = new URLSearchParams({
      client_id: runtimeConfig.oauth.clientId,
      redirect_uri: runtimeConfig.public.origin + '/login',
      response_type: 'code',
      scope: 'openid',
      state: oauthState,
      code_challenge_method: 'S256',
      code_challenge: codeVerifierChallenge,
    });

    const urlParams = oauthParams.toString();

    return sendRedirect(event, `${runtimeConfig.services.atlas}/oauth2/authorize?${urlParams}`);
  }
});
