import type { Session } from '~/types/profile-types';

export async function useAuth() {
  const user: Ref<Session | null> = useState('oauth_user', () => null);
  const isFetchingUser: Ref<Boolean> = useState('i_f_u', () => false);

  if (!user.value && !isFetchingUser.value) {
    try {
      user.value = await useRequestFetch()('/api/userinfo');
    } catch (e) {
      console.error('Error fetching user.', e);
      user.value = null;
    } finally {
      isFetchingUser.value = false;
    }
  }

  const isSignedIn = computed(() => !!user.value);

  return {
    user,
    isSignedIn,
  };
}

export function useSafeRedirectToLogin() {
  const nextURLCookie = useCookie('oauth_next_url');

  const redirectToLogin = (toPath: string | null = null) => {
    let nextURL = toPath;
    if (!toPath) {
      const route = useRoute();
      nextURL = route.fullPath;
    }
    nextURLCookie.value = nextURL;

    return navigateTo("/login");
  }

  return { redirectToLogin };
}
