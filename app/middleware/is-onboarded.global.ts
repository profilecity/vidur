/**
 * If on onboarding page,
 *   - if onboarded, go to home
 *   - else do nothing,
 * Else,
 *   - If not signed in, redirect to sign in
 *   - Else, navigate to onboarding page.
 */
export default defineNuxtRouteMiddleware((to) => {
  const onboardingStatus = useOnboardingStatus();
  const auth = useAuth();
  const { redirectToLogin } = useSafeRedirectToLogin();

  if (to.path.startsWith('/onboarding')) {
    if (!auth.isSignedIn.value) {
      return redirectToLogin(to.fullPath);
    }
    if (onboardingStatus.value) {
      return navigateTo('/');
    }
    return;
  }
  if (!onboardingStatus.value) {
    return navigateTo('/onboarding');
  }
});
