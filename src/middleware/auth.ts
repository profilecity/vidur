export default defineNuxtRouteMiddleware(async (to) => {
  const auth = await useAuth();
  const { redirectToLogin } = useSafeRedirectToLogin();
  
  if (!auth.isSignedIn) {
    return redirectToLogin(to.fullPath);
  }
})