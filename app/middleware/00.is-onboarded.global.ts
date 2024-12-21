export default defineNuxtRouteMiddleware((to) => {
  const onboardingStatus = useOnboardingStatus();
  const { redirectPostLogin } = useSafeRedirectToLogin(to);

  if (to.path.startsWith('/onboarding')) {
    if (onboardingStatus.value) {
      return redirectPostLogin();
    }
  } else {
    if (!onboardingStatus.value) {
      return navigateTo('/onboarding');
    }
  }
});
