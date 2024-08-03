import type { Session } from "~/types/profile-types";

export default defineNuxtPlugin(async () => {
  const user: Ref<Session | null> = useState('oauth_user', () => null);
  const requestFetch = useRequestFetch();
  try {
    // @ts-ignore
    user.value = await requestFetch('/api/userinfo');
  } catch (e) {
    console.error('Error fetching user.', e);
    user.value = null;
  }
})