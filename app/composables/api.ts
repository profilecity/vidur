export function useApplicationStatus(postingId: string) {
  const auth = useAuth();
  return useFetch('/api/application-status', {
    query: { postingId },
    immediate: auth.isSignedIn.value,
  });
}
