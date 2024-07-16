export function usePostingIds() {
  const postingsApiCall = useFetch<{ id: string; title: string }[]>('/api/postings');

  const postings = ref<{ id: string; title: string }[]>([]);
  const fetching = computed(() => postingsApiCall.status.value == 'pending');

  watchEffect(() => {
    switch (postingsApiCall.status.value) {
      case 'success':
        postings.value = postingsApiCall.data.value as { id: string; title: string }[];
        break;
      case 'error':
        console.error('Error fetching postings', postingsApiCall.error.value);
        break;
    }
  });

  return {
    postings,
    fetching,
  };
}
