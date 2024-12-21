const WHITELISTED_PATHS = ['/admin/login'];

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return;
  if (WHITELISTED_PATHS.includes(to.path)) return;

  console.log(to.path);

  const { redirectToLogin } = useSafeRedirectToLogin(to);
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return redirectToLogin();
  }

  const { user } = useUserSession();
  if (!user.value) {
    throw createError({
      statusCode: 500,
      message: 'User not available. Internal Error.',
    });
  }
});
