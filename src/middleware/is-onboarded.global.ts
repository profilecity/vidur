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
  if (to.path.startsWith('/onboarding')) {
    if (onboardingStatus.value) {
      return navigateTo("/");
    }
    return;
  };
  if (!onboardingStatus.value) {
    const auth = useAuth();
    const { redirectToLogin } = useSafeRedirectToLogin();
    
    if (!auth.isSignedIn) {
      return redirectToLogin(to.fullPath);
    }
    return navigateTo("/onboarding");
  }
})
