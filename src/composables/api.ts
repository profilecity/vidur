export function useGeneralSettings() {
  return useFetch("/api/settings/general");
}