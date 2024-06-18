export default defineNuxtRouteMiddleware(async (_) => {
  const auth = await useAuth();
  if (!auth.user.value) {
    return navigateTo("/login");
  }
  const session = auth.user;
  if (!session.value?.profile.isAdmin) {
    return navigateTo("/");
  }
})