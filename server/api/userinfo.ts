import authenticateRequest from '../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    const { user: profile } = await authenticateRequest(event);
    const bypassAdmin = useRuntimeConfig().bypassAdmin;

    const session = {
      profile: {
        ...profile,
        isAdmin: bypassAdmin,
      },
    };

    return session;
  } catch (e) {
    // @ts-expect-error
    if (e.statusCode !== 401) {
      console.error(e);
    }
    throw e;
  }
});
