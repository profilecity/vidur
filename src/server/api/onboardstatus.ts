import authenticateRequest from "../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await authenticateRequest(event);
  const onboardingStatus = await getUserOnboardStatus(event);

  if (IS_DEV) {
    console.log(
      'user',
      session.user.id,
      'onboarding status',
      onboardingStatus.onboardingURL
        ? 'PENDING ' + onboardingStatus.onboardingURL
        : 'ONBOARDED',
    );
  }

  return onboardingStatus;
})