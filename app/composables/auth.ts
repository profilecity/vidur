export function useAuth() {
  const session = useSessionState();
  const isSignedIn = computed(() => !!session.value.profile);
  const profile = computed(() => session.value.profile);

  return {
    session,
    profile,
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

    return navigateTo('/login', { external: true });
  };

  return { redirectToLogin };
}
