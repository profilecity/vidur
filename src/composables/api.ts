import type { GeneralSettings } from '~/schemas/setting';
import type { JobPosting } from '~/server/db/schema';

export function useGeneralSettings(config?: string) {
  return useFetch<GeneralSettings>('/api/settings/general', {
    query: {
      config,
    },
  });
}

export function usePublicPostings() {
  return useFetch<JobPosting[]>('/api/public/postings');
}

export function usePublicPosting(id: string) {
  const res = useFetch<JobPosting>('/api/public/posting', { query: { id } });
  watchEffect(() => {
    if (res.error.value) {
      if (res.error.value.statusCode == 404) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Job posting not found.',
        });
      }
      console.error(res.error.value);
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching job posting.',
      });
    }
  });
  return res;
}

export function useApplicationStatus(postingId: string) {
  const auth = useAuth();
  return useFetch('/api/application-status', { query: { postingId }, immediate: auth.isSignedIn.value });
}
