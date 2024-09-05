export default defineNuxtRouteMiddleware(async (to) => {
  const { profile, isSignedIn } = useAuth();
  const { redirectToLogin } = useSafeRedirectToLogin();

  if (!isSignedIn.value) {
    return redirectToLogin(to.fullPath);
  }

  if (!profile.value.isAdmin) {
    return navigateTo('/');
  }
});
