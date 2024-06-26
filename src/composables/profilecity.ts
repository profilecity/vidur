/**
 * This functions holds on to calling any user-specific API unless triggered.
 * This is to ensure that it can be used based on user-interaction.
 */
export function useLazyOnboarder() {
  const checkIfOnboardPending = async () => {
    const auth = await useAuth();
    const { redirectToLogin } = useSafeRedirectToLogin();

    if (!auth.isSignedIn) {
      redirectToLogin();
      return false;
    }

    const onboardingStatus = await $fetch('/api/onboardstatus');

    if (onboardingStatus.onboardingURL) {
      const onboardingURL = new URL(onboardingStatus.onboardingURL);
      onboardingURL.searchParams.append('callback', window.location.href);
      await navigateTo(onboardingURL.href, { external: true });
      return true;
    }
    return false;
  };

  return { checkIfOnboardPending };
}
