import { type User, type UserHandle } from '~/server/db/schema';

export type Applicant = { user: User; handles: UserHandle[] };
export type Applicants = Record<string, Applicant>; // applicantId <> applicant
export type Application = { createdAt: Date; id: string; candidateId: string; postingId: string };
export type Applications = Record<string, Application[]>; // postingId <> applications

type ApplicationsGetReponse = { applications: Applications; applicants: Applicants };

export function useApplications() {
  const postingIds = ref<string[]>([]);

  const applicantsApiCall = useFetch<ApplicationsGetReponse>('/api/applications', {
    query: computed(() => ({
      postingIds: postingIds.value.join(','),
    })),
    immediate: false,
  });

  const fetching = computed(() => applicantsApiCall.status.value == 'pending');
  const applicants = ref<Applicants>({});
  const applications = ref<Applications>({});

  watchEffect(() => {
    switch (applicantsApiCall.status.value) {
      case 'success':
        const applicantsResponse = applicantsApiCall.data.value as ApplicationsGetReponse;
        applications.value = applicantsResponse.applications;
        applicants.value = applicantsResponse.applicants;
        break;
      case 'error':
        console.error('Error fetching applications for postingIds', postingIds, applicantsApiCall.error.value);
        break;
    }
  });

  const fetch = (ids: string[]) => {
    if (ids.length == 0) return;

    applicants.value = {};
    applications.value = {};
    postingIds.value = ids;
  };

  return {
    fetching,
    fetch,

    applicants,
    applications,
    postingIds,
  };
}
