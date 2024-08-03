export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();
  const { redirectToLogin } = useSafeRedirectToLogin();
  
  if (!auth.isSignedIn) {
    return redirectToLogin(to.fullPath);
  }
})