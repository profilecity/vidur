import type { Session } from '~/types/profile-types';

export default defineNuxtPlugin(async () => {
  const user: Ref<Session | null> = useState('oauth_user', () => null);
  const requestFetch = useRequestFetch();
  try {
    const res = await useAsyncData('oauth-sess-fetch', () =>
      requestFetch('/api/userinfo')
    );
    user.value = res.data.value;
  } catch (e) {
    console.error('Error fetching user.', e);
    user.value = null;
  }
});
