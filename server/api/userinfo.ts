import authenticateRequest from '../utils/auth';
import { getUserOnboardStatus } from '../utils/user';

export default defineEventHandler(async (event) => {
  const { user: profile } = await authenticateRequest(event, {
    useTokenFromHeader: true,
  });

  const onboardingStatus = await getUserOnboardStatus(event);

  if (IS_DEV) {
    console.log(
      'user',
      profile.id,
      'onboarding status',
      onboardingStatus.onboardingURL
        ? 'PENDING ' + onboardingStatus.onboardingURL
        : 'ONBOARDED',
    );
  }

  const session = {
    profile,
    onboardingStatus,
  };

  return session;
});
