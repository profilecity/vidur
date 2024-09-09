import type { Session } from '~~/shared/types/profile-types';

export default defineNuxtPlugin(async () => {
  const session = useSessionState();
  const requestFetch = useRequestFetch();
  try {
    const res = await useAsyncData<Session>('oauth-sess-fetch', () => requestFetch('/api/userinfo'));
    const fetchedSession = res.data.value;
    session.value = fetchedSession as Session; // it's ok if data not present.
  } catch (e) {
    console.error('Error while fetching session', e);
  }
});
