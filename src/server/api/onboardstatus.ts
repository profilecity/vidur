import authenticateRequest from "../utils/auth";
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (event) => {
  const session = await authenticateRequest(event);
  const onboardingStatus = await getUserOnboardStatus(event);

  if (IS_DEV) {
    logger.info(
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