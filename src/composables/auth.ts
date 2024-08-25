import type { Session } from '~/types/profile-types';

export function useAuth() {
  const user: Ref<Session | null> = useState('oauth_user', () => null);
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

    return navigateTo("/login", { external: true });
  }

  return { redirectToLogin };
}
