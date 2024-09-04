import authenticateRequest from '../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    const { user: profile } = await authenticateRequest(event);
    const bypassAdmin = useRuntimeConfig().bypassAdmin;

    const session = {
      profile: {
        ...profile,
        isAdmin: profile.isAdmin || bypassAdmin,
      },
    };

    return session;
  } catch (e) {
    if (IS_DEV) {
      console.error(e);
    }
    throw e;
  }
});
