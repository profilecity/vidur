import type { Session } from '~~/shared/types/profile-types';

export default defineNuxtPlugin(async () => {
  const session = useSessionState();
  const requestFetch = useRequestFetch();
  try {
    const res = await useAsyncData<Session>('oauth-sess-fetch', () =>
      requestFetch('/api/userinfo')
    );
    const fetchedSession = res.data.value;
    if (!fetchedSession) {
      throw new Error('Empty session received');
    }
    session.value = fetchedSession;
  } catch (e) {
    console.error('Error fetching user.', e);
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to setup session. Try again later',
    });
  }
});
