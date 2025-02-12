export function useSafeRedirectToLogin(route: ReturnType<typeof useRoute>) {
  const nextURLCookie = useCookie('oauth_next_url');

  const redirectToLogin = (toPath: string | null = null) => {
    let nextURL = toPath;
    if (!toPath) {
      nextURL = route.fullPath;
    }
    nextURLCookie.value = nextURL;

    return navigateTo('/admin/login');
  };

  const redirectPostLogin = () => {
    const nextURL = nextURLCookie.value;
    nextURLCookie.value = undefined; // del cookie
    if (nextURL) {
      return navigateTo(nextURL);
    }
    return navigateTo('/admin/dashboard');
  };

  return { redirectToLogin, redirectPostLogin };
}
